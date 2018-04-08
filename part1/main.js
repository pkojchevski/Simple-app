var Main1 = /** @class */ (function () {
    function Main1() {
        var _this = this;
        this.mediaList = [];
        this.searchedMediaList = [];
        this.id = 0;
        this.modal = document.getElementById('myModal');
        this.closebtn = document.getElementById('close');
        this.btn = document.getElementById('btn_open');
        this.btn.onclick = function () { return _this.openModalForAdd(); };
        this.closebtn.onclick = function () { return _this.closeModal(); };
        this.form = document.getElementById('mediaForm');
        this.title = document.getElementById('title');
        this.author = document.getElementById('author');
        this.publisher = document.getElementById('publisher');
        this.notes = document.getElementById('notes');
        this.types = document.getElementById("type");
        this.add = document.getElementById('add');
        this.add.onclick = function () { return _this.addMedia(); };
        this.update = document.getElementById('update');
        this.update.onclick = function () { return _this.updateMedia(); };
        this.input_id = document.getElementById('input_id');
        this.search = document.getElementById('search');
        this.search.onkeyup = function () { return _this.searchTitle(); };
    }
    Main1.prototype.closeModal = function () {
        this.resetForm();
        this.modal.style.display = 'none';
    };
    Main1.prototype.openModalForAdd = function () {
        this.update.style.display = 'none';
        this.add.style.display = 'block';
        this.modal.style.display = 'block';
        this.title.readOnly = false;
        document.getElementById('titleErr').style.display = 'none';
        document.getElementById('authorErr').style.display = 'none';
        document.getElementById('publisherErr').style.display = 'none';
        document.getElementById('typeErr').style.display = 'none';
    };
    Main1.prototype.openModalForUpdate = function () {
        this.update.style.display = 'block';
        this.add.style.display = 'none';
        this.modal.style.display = 'block';
        this.title.readOnly = true;
        document.getElementById('titleErr').style.display = 'none';
        document.getElementById('authorErr').style.display = 'none';
        document.getElementById('publisherErr').style.display = 'none';
        document.getElementById('typeErr').style.display = 'none';
    };
    Main1.prototype.addMedia = function () {
        var media = { id: 0, title: '', author: '', publisher: '', types: 'video', notes: '' };
        if (!this.formValidation())
            return;
        media.title = this.title.value;
        media.author = this.author.value;
        media.publisher = this.publisher.value;
        media.types = this.types.value;
        media.notes = this.notes.value;
        media.id = this.id++;
        //push object from form to a array
        this.mediaList.push(media);
        //update Table
        this.createTable(this.mediaList);
        this.resetForm();
        //closeModal
        this.closeModal();
    };
    Main1.prototype.createTable = function (mList) {
        var _this = this;
        var tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        var cell;
        var text;
        var btn;
        // create table
        mList.forEach(function (media) {
            var row = document.createElement('tr');
            for (var prop in media) {
                cell = document.createElement('td');
                text = document.createTextNode(media[prop]);
                cell.appendChild(text);
                row.appendChild(cell);
                row.classList.add('rowid' + media.id.toString());
                tableBody.appendChild(row);
            }
            // create Edit Button
            cell = document.createElement('td');
            btn = document.createElement('input');
            btn.type = 'button';
            btn.value = 'Edit';
            btn.setAttribute('id', "edit_id_" + media.id);
            btn.onclick = function () { return _this.editMedia(); };
            row.appendChild(cell);
            cell.appendChild(btn);
            // create DeleteButton
            cell = document.createElement('td');
            btn = document.createElement('input');
            btn.setAttribute('id', "delete_id_" + media.id);
            btn.type = 'button';
            btn.value = 'Delete';
            btn.onclick = function () { return _this.deleteMedia(); };
            cell.appendChild(btn);
            row.appendChild(cell);
            tableBody.appendChild(row);
        });
    };
    Main1.prototype.editMedia = function () {
        var id = parseInt(event.srcElement.id.replace('edit_id_', ''));
        var index = this.mediaList.map(function (item) { return item.id; }).indexOf(id);
        var media = this.mediaList[index];
        this.update.style.display = 'block';
        this.add.style.display = 'none';
        this.openModalForUpdate();
        this.input_id.value = media.id;
        this.title.value = media.title;
        this.author.value = media.author;
        this.publisher.value = media.publisher;
        this.notes.value = media.notes;
        this.types.value = media.types;
    };
    Main1.prototype.deleteMedia = function () {
        if (confirm('Are you absolutely sure you want to delete?')) {
            var id_1 = parseInt(event.srcElement.id.replace('delete_id_', ''));
            this.mediaList = this.mediaList.filter(function (item) { return item.id !== id_1; });
            this.createTable(this.mediaList);
        }
    };
    Main1.prototype.resetForm = function () {
        this.title.value = '';
        this.author.value = '';
        this.publisher.value = '';
        this.notes.value = '';
    };
    Main1.prototype.updateMedia = function () {
        var media = { id: 0, title: '', author: '', publisher: '', types: 'video', notes: '' };
        if (!this.formValidation())
            return;
        media.id = parseInt(this.input_id.value);
        media.title = this.title.value;
        media.author = this.author.value;
        media.publisher = this.publisher.value;
        media.notes = this.notes.value;
        media.types = this.types.value;
        var index = this.mediaList.map(function (item) { return item.id; }).indexOf(media.id);
        this.mediaList[index] = media;
        this.createTable(this.mediaList);
        this.closeModal();
    };
    Main1.prototype.searchTitle = function () {
        var title = document.getElementById('search');
        if (title.value === '') {
            this.createTable(this.mediaList);
        }
        else {
            this.searchedMediaList = this.mediaList.filter(function (item) {
                return item.title.toLowerCase() === title.value.toLowerCase();
            });
            this.createTable(this.searchedMediaList);
        }
    };
    Main1.prototype.formValidation = function () {
        var err1 = true;
        var err2 = true;
        var err3 = true;
        if (this.title.value.length === 0) {
            var err = document.getElementById('titleErr');
            err.style.display = 'block';
            err1 = false;
        }
        if (this.author.value.length === 0 && this.publisher.value.length === 0) {
            console.log('here1');
            var authorErr = document.getElementById('authorErr');
            var publisherErr = document.getElementById('publisherErr');
            authorErr.style.display = 'block';
            publisherErr.style.display = 'block';
            err2 = false;
        }
        
        if (this.types.value.length === 0) {
            console.log('here');
            var typeErr = document.getElementById('typeErr');
            typeErr.style.display = 'block';
            err3 = false;
        }
        return err1 && err2 && err3;
    };
    return Main1;
}());
new Main1();
