import { Component } from '@angular/core';
import { AppServiceService } from './service/app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JIRA-BOARD';
  public cardData:any = [];
  public addList = false;
  public draggedData = {id: '', data: {
          "header": "",
          "desc": "",
          "creationTime": "",
          "cardId":""
  }};
  constructor(private appService: AppServiceService){}

  ngOnInit(){
    this.getListData();
  }

  getListData(){
    this.appService.getCardData().subscribe(data =>{
      this.cardData = data
    })
  }

  addNewList(){
    let person = prompt("Please enter List name", "");
    if (person != "") {
      let objData = {
          "cardHeader": person,
          "id":this.cardData.length + 1,
          "subCards": []
      }
      this.appService.updateList(objData).subscribe( data =>{
        alert("Done");
        this.getListData();
      },
      error =>{
        alert("error")
      })
    }
  }

  deleteList(item:any){
    this.appService.deleteList(item.id).subscribe( data =>{
      alert("Done");
      this.getListData();
    })
  }

  addNewCard(id:any){
    alert(id)
    let desc = prompt("Please enter Card Discription", "");
    if (desc != "") {
      
      for(let i=0; i < this.cardData.length; i++){
        if(this.cardData[i].id == id){
          let newCardData = {
            "header": "New Card",
            "desc": desc,
            "creationTime": this.currentTime(),
            "cardId": this.cardData[i].length + 1
          }
          this.cardData[i].subCards.unshift(newCardData);
          this.appService.transferCard(this.cardData[i], id).subscribe(resp =>{
            alert('Created')
          })
        }
      }
    }
  }

  currentTime(){
    let time = new Date();
    let hour = time.getHours();
    let minuts = time.getMinutes();
    let seconds = time.getSeconds();

    return hour + ":" + minuts + ":" + seconds;
  }

  onCardDrag(event:any){
    event.preventDefault();
    //console.log('aa')
  }

  onDropCard(event:any, id:any){
    event.preventDefault();
    for(let i = 0; i < this.cardData.length; i++){
      if(this.cardData[i].id == this.draggedData.id){
        for(let j=0; j<this.cardData[i].subCards.length; j++){
          if(this.cardData[i].subCards[j].cardId == this.draggedData.data.cardId){
            this.cardData[i].subCards.slice(j);
            this.appService.transferCard(this.cardData[i], this.draggedData.id).subscribe(resp =>{
              alert('removed')
            })
          }
        }
      }
      if(this.cardData[i].id == id){
        this.cardData[i].subCards.push(this.draggedData.data);
        this.appService.transferCard(this.cardData[i], id).subscribe(resp =>{
          alert('transfeered')
        })
      }
    }
  }

  drag(ev:any, data:any, id:any) {
    let obj = {
      id: id,
      data: data
    }
    this.draggedData = obj;
    // console.log(obj)
    // ev.dataTransfer.setData("text", obj);
  }
}
