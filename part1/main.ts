

type Type = 'video' | 'game' | 'music' | 'other';

interface Media {
    id: number;
    title: string;
    author?: string;
    publisher?: string;
    types: Type;
    notes: string;
}



class Main1 {
   mediaList: Array<Media> = [];
   searchedMediaList: Array<Media> = [];
   table;
   row;
   modal;
   btn;
   closebtn;
   add;
   form;
   id: number = 0;
   title;
   author;
   publisher;
   notes;
   types;
   update;
   input_id;
   search;

   constructor() {
    this.modal = <HTMLElement>document.getElementById('myModal');
    this.closebtn = <HTMLButtonElement>document.getElementById('close');
    this.btn = <HTMLButtonElement>document.getElementById('btn_open');
    this.btn.onclick = () => this.openModalForAdd();
    this.closebtn.onclick = () => this.closeModal();
    this.form = <HTMLFormElement>document.getElementById('mediaForm');

    this.title = <HTMLInputElement>document.getElementById('title');
    this.author = <HTMLInputElement>document.getElementById('author');
    this.publisher = <HTMLInputElement>document.getElementById('publisher');
    this.notes = <HTMLInputElement>document.getElementById('notes');
    this.types = <HTMLSelectElement>document.getElementById("type");

    this.add = <HTMLButtonElement>document.getElementById('add');
    this.add.onclick = () => this.addMedia();

    this.update = <HTMLButtonElement>document.getElementById('update');
    this.update.onclick = () => this.updateMedia();

    this.input_id = <HTMLInputElement>document.getElementById('input_id');

    this.search = <HTMLInputElement>document.getElementById('search');
    this.search.onkeyup = () => this.searchTitle();
   }

   closeModal() {
       this.resetForm();
       this.modal.style.display = 'none';
   }

   openModalForAdd() {
      this.update.style.display = 'none';
      this.add.style.display = 'block';
      this.modal.style.display = 'block';
      this.title.readOnly = false;

      document.getElementById('titleErr').style.display='none';
      document.getElementById('authorErr').style.display='none';
      document.getElementById('publisherErr').style.display='none';
      document.getElementById('typeErr').style.display='none';
   }

   openModalForUpdate() {
      this.update.style.display = 'block';
      this.add.style.display = 'none';
      this.modal.style.display = 'block';
      this.title.readOnly = true;

      document.getElementById('titleErr').style.display='none';
      document.getElementById('authorErr').style.display='none';
      document.getElementById('publisherErr').style.display='none';
      document.getElementById('typeErr').style.display='none';
   }

  addMedia() { 
      const media: Media = {id:0, title:'', author:'', publisher:'', types:'video', notes:''};

    if (!this.formValidation()) return;
    
     media.title= this.title.value;
     media.author = this.author.value;
     media.publisher = this.publisher.value;

     media.types = this.types.value;
     media.notes= this.notes.value;
     media.id = this.id++;

     //push object from form to a array
     this.mediaList.push(media);

     //update Table
    this.createTable(this.mediaList);
    
    this.resetForm();
    //closeModal
    this.closeModal();
   }

   createTable(mList) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    let cell;
    let text;
    let btn;
// create table
        mList.forEach(media => {
        const row = document.createElement('tr');
        for (let prop in media) {
            cell = document.createElement('td');
            text = document.createTextNode(media[prop]);
            cell.appendChild(text);
            row.appendChild(cell);
            row.classList.add('rowid'+ media.id.toString());
            tableBody.appendChild(row);
        }
    // create Edit Button
        cell = document.createElement('td');
        btn = document.createElement('input');
        btn.type = 'button'
        btn.value = 'Edit';
        btn.setAttribute('id', `edit_id_${media.id}`);
        btn.onclick = () => this.editMedia();
        row.appendChild(cell);
        cell.appendChild(btn);

    // create DeleteButton
        cell = document.createElement('td');
        btn = document.createElement('input');
        btn.setAttribute('id', `delete_id_${media.id}`);
        btn.type = 'button';
        btn.value = 'Delete';
        btn.onclick = () => this.deleteMedia();
        cell.appendChild(btn);
        row.appendChild(cell);
        tableBody.appendChild(row);
    });
   }

    
    editMedia() { 
       const id = parseInt(event.srcElement.id.replace('edit_id_',''));
       const index = this.mediaList.map(item => item.id).indexOf(id);
       const media = this.mediaList[index];

       this.update.style.display = 'block';
       this.add.style.display = 'none';

       this.openModalForUpdate();
       
       this.input_id.value = media.id;
       this.title.value = media.title;
       this.author.value = media.author;
       this.publisher.value = media.publisher;
       this.notes.value = media.notes;
       this.types.value = media.types;
    }


    deleteMedia() {
        if(confirm('Are you absolutely sure you want to delete?')) {
            const id = parseInt(event.srcElement.id.replace('delete_id_',''));
            this.mediaList = this.mediaList.filter(item => item.id !== id);
            this.createTable(this.mediaList);
        }
    }

    resetForm() {
        this.title.value = '';
        this.author.value = '';
        this.publisher.value = '';
        this.notes.value = '';
    }

    updateMedia() {
      let media: Media = {id: 0, title:'', author:'', publisher:'', types:'video', notes:''};
      if(!this.formValidation()) return;
        media.id = parseInt(this.input_id.value);
        media.title = this.title.value;
        media.author = this.author.value;
        media.publisher = this.publisher.value;
        media.notes = this.notes.value;
        media.types = this.types.value;

        const index = this.mediaList.map(item => item.id).indexOf(media.id);
        this.mediaList[index] = media;
        
        this.createTable(this.mediaList);

        this.closeModal();
 
    }

    searchTitle() {
       let title = <HTMLInputElement>document.getElementById('search');
       if(title.value === '') {
        this.createTable(this.mediaList);
       } else {
        this.searchedMediaList = this.mediaList.filter((item) => 
        item.title.toLowerCase() === title.value.toLowerCase());
        this.createTable(this.searchedMediaList);
       }
    } 

    formValidation(): boolean {
        let err1: boolean = true;
        let err2: boolean = true;
        let err3: boolean = true;

        if (this.title.value.length === 0) {
            let err = <HTMLElement>document.getElementById('titleErr');
            err.style.display = 'block';
            err1 = false;
        }

        if (this.author.value.length === 0 && this.publisher.value.length === 0) {
            let authorErr = <HTMLElement>document.getElementById('authorErr');
            let publisherErr = <HTMLElement>document.getElementById('publisherErr');
            authorErr.style.display = 'block';
            publisherErr.style.display = 'block';
            err2 = false;
        }

        if (this.types.length === 0) {
            console.log('here');
            let typeErr = <HTMLElement>document.getElementById('typeErr');
            typeErr.style.display = 'block';
            err3 = false;
        }

       return err1 && err2 && err3;
    }

}


new Main1();