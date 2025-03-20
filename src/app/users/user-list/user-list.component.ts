import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { User } from '../../models/user.model';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: false
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['avatar', 'id', 'fullName', 'username', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  isLoading = false;
  searchTerm = '';
  private searchSubject = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.setupSearchObservable();
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  setupSearchObservable(): void {
    this.searchSubject.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.loadUsers();
    });
  }

  onSearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchValue);
  }

  loadUsers(): void {
    this.isLoading = true;
    
    const page = this.paginator?.pageIndex + 1 || 1;
    const limit = this.paginator?.pageSize || 10;
    
    this.userService.getUsers(page, limit, this.searchTerm)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (users) => {
          this.dataSource.data = users;
        },
        error: (error) => {
          console.error('Error loading users:', error);
          this.showErrorMessage('Failed to load users. Please try again.');
        }
      });
  }

  openUserForm(user?: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(UserDeleteDialogComponent, {
      width: '400px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id)
          .subscribe({
            next: () => {
              this.showSuccessMessage('User deleted successfully');
              this.loadUsers();
            },
            error: (error : any) => {
              console.error('Error deleting user:', error);
              this.showErrorMessage('Failed to delete user. Please try again.');
            }
          });
      }
    });
  }

  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }
}
