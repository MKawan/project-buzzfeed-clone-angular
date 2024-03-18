import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  title: string = '';
  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelectrd: string = '';

  questionsIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;
  playerChoose(value: string){
        this.answers.push(value);
        this.nextStep();
  }
  async nextStep(){
    this.questionsIndex += 1
    if(this.questionMaxIndex > this.questionsIndex){
      this.questionSelected = this.questions[this.questionsIndex]
    }else{
      const finalAnswer: string = await this.checkresult((this.answers))
      this.finished = true
      this.answerSelectrd = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }
  async checkresult(answers: string[]){
    const result = answers.reduce((prev, current, i, arr) =>{
      if(
        arr.filter(item => item == prev).length > arr.filter(item => item == current).length
      ){
        return prev
      }else{
        return current
      }
    })
    return result
  }
  ngOnInit(): void{
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionsIndex]
      
      this.questionsIndex = 0;
      this.questionMaxIndex = this.questions.length


    }
  }
}
