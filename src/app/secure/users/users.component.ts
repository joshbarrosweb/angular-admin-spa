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
  lastPage!: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.load();
  }

  load(page = 1): void {
    this.userService.all(page).subscribe((response: any) => {
      this.users = response.data;
      this.lastPage = response.meta.last_page;
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this record?')) {
      this.userService.delete(id).subscribe(() => {
        this.users = this.users.filter((user) => user.id !== id);
      });
    }
  }
}
