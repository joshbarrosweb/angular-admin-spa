import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  page = 1;
  lastPage!: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.userService.all(this.page).subscribe((response: any) => {
      this.users = response.data;
      this.lastPage = response.meta.last_page;
    });
  }

  next(): void {
    if (this.page === this.lastPage) {
      return;
    }

    this.page++;
    this.load();
  }

  previous(): void {
    if (this.page === 1) {
      return;
    }

    this.page--;
    this.load();
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter((user) => user.id !== id);
      });
    }
  }
}
