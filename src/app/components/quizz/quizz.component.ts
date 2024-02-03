import { Component, OnInit } from '@angular/core';
import  quizz_questions from 'src/app/assets/data/quizz_questions.json'
@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit  {

  title:string = 'Titulo'
  constructor(){

  }


questions: any
questionSelected: any

answers: string[] = []
answerSelected: string = ''

questionIndex: number = 0
questionMaxIndex: number = 0

finish: boolean = false


ngOnInit(): void{
  if(quizz_questions){
    this.finish = false
    this.title = quizz_questions.title

    this.questions = quizz_questions.questions
    this.questionSelected = this.questions[this.questionIndex]

    this.questionIndex = 0
    this.questionMaxIndex = this.questions.length

}
}
  playerChoose(value:string){
  this.answers.push(value)
  console.log(this.answers)
  this.nextStep()
}


 nextStep(){
  this.questionIndex += 1
  if(this.questionMaxIndex > this.questionIndex){
    this.questionSelected = this.questions[this.questionIndex]
  }else{
    const finalAnswer: string = this.checkResults(this.answers)
    this.finish = true
    this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]

  }



}

checkResults(answers: string[]):string{
  const result = answers.reduce((previus, current, i , arr) => {
    if(
      arr.filter(item => item === previus).length >
      arr.filter(item => item === current).length
    ){
      return previus
    }else{
      return current
    }
  })

  return result
}

}
