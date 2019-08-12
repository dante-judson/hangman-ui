import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from './app.service';
import Swal from 'sweetalert2';
import { Word } from './word';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  gameEnded = false;
  letters:string[] = [];
  word: Word = new Word();
  positions: number[];
  gameOver = false;
  loading = false;
  timeout;

  constructor(private service: AppService) {

  }

  ngOnInit() {
    this.setLoadign(true);
    this.service.getRamdonWord()

      .subscribe(response => {
        this.setLoadign(false);
        this.word = response;
        this.positions = Array(this.word.length).fill(0).map((x, i) => i);
        this.word.word = [];
        this.word.wrongLetters = [];
      });

      this.service.isGameOver()
      .subscribe(state => {
        this.gameOver = state;
        if(this.gameOver == true) {
          this.gameEnded = true;
          this.setLoadign(false);
        }
      })
  }

  setLoadign(state: boolean) {
    if(state === true) {
      this.timeout = setTimeout(()=>this.loading=true,100);
    } else {
      clearTimeout(this.timeout);
      this.loading = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyEvent(event: any) {
    if (/^[a-z]+$/.test(event.key) && !this.gameEnded) {
      this.letters.push(event.key);
      this.setLoadign(true);
      this.service.attempt(this.letters, this.word.id)
      .subscribe(response => {
        this.setLoadign(false);
        this.word = response;
        if(this.word.word.filter(w => !w).length == 0){
          this.gameEnded = true;
          Swal.fire({
            title: 'Contratulations!',
            html: `You won!! <br>Would you like to play again?`,
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonText: 'No',
            type: 'success'
        }).then(result => {
            if(result.value) {
                window.location.reload();
            }
        })
        }
      })
    }
  }
}
