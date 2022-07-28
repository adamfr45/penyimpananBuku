const RENDER_EVENT = 'ubah'
const todos = []
const formInput = document.querySelector('#masukanData')
const storageKey = 'STORAGE_KEY'
const SAVED_EVENT = 'saved-todo'
const cek =document.querySelector('#check')
const submit = document.querySelector('#inputForm2')
const cariData = document.querySelector('#cariData')


document.addEventListener('DOMContentLoaded',function(){
    formInput.addEventListener('submit',function(event){
        event.preventDefault();
        adddata();
    });
    submit.addEventListener('click',function(event){
        event.preventDefault();
        adddataa();
        
    });
    if(isStorageExist()){
        loadDataFromStorage()
    }
});

cariData.addEventListener('keyup',pencarianList);

function pencarianList(e){
    const cariData = e.target.value.toLowerCase();
    let item = document.querySelectorAll('.containerItem');

    item.forEach((item)=>{
        const isiItem =item.firstChild.textContent.toLocaleLowerCase();
        if(isiItem.indexOf(cariData)!= -1){
            item.setAttribute('style','display:block');
        }else{
            item.setAttribute('style','display: none');
        }
    })
}

function isStorageExist(){
    if(typeof(Storage)===undefined){
        alert('asdadas');
        return false
    }
    return true
}

function loadDataFromStorage(){
    const serializedData = localStorage.getItem(storageKey);
    let data = JSON.parse(serializedData);

    if (data !== null){
        for (const todo of data){
            todos.push(todo);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT))

}

function adddataa(){
    const input1 = document.querySelector('#judul').value;
    const input2= document.querySelector('#penulis').value;
    const input3= document.querySelector('#tahun').value;
    const noId = noID();
    const indormasi = informasi(noId,input1,input2,parseInt(input3),true);
    todos.push(indormasi);
   

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function adddata(){
    const input1 = document.querySelector('#judul').value;
    const input2= document.querySelector('#penulis').value;
    const input3= document.querySelector('#tahun').value;
    
    const noId = noID();
    const indormasi = informasi(noId,input1,input2,parseInt(input3),false);
    todos.push(indormasi);
   

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function informasi(id,title,author,year,isComplete){
    return{id,title,author,year,isComplete}
}

function noID(){
    return + new Date();
}

function tambahTampilan(tambah){
    const container = document.createElement('div');
    container.classList.add('containerItem');
    const bSelesai = document.querySelector('#bSelesai')
    const data1 = document.createElement('h1');
    data1.innerText =("Judul:"+tambah.title);
    const data2 = document.createElement('h3');
    data2.innerText =("Penulis:"+tambah.author);
    const data3 = document.createElement('h3');
    data3.innerHTML=("Tanggal:"+tambah.year);
    container.append(data1,data2,data3);
    bSelesai.appendChild(container);

    if(tambah.isComplete){
        const balik = document.createElement('button');
        const btn = document.createTextNode('Pindah Rak')
        balik.appendChild(btn)
        balik.classList.add('bBalik1');

        const hapus = document.createElement('button')
        const btnH = document.createTextNode('Hapus');
        hapus.appendChild(btnH);
        hapus.classList.add('btnHapus')


        balik.addEventListener('click', function(){
            balikk(tambah.id)
        })
        hapus.addEventListener('click',function(){
            hapuss(tambah.id)
        })


        container.append(balik,hapus)
    }else{
        const balik2 = document.createElement('button');
        const btn = document.createTextNode('Pindah Rak');
        balik2.appendChild(btn);
        balik2.classList.add('bBalik2');

        const hapus = document.createElement('button');
        const btnH = document.createTextNode('Hapus');
        hapus.appendChild(btnH);
        hapus.classList.add('btnHapus')

        balik2.addEventListener('click',function(){
            balikk2(tambah.id);
        })
        hapus.addEventListener('click',function(){
            hapuss(tambah.id)
        })

        container.append(balik2,hapus);
    }
    return container

    
}

document.addEventListener(RENDER_EVENT,function(){
    
    const tampil = document.querySelector('#bSelesai');
    tampil.innerHTML='';

    const tampil2 =document.querySelector('#sSelesai');
    tampil2.innerHTML='';

    for(const item of todos){
        const element = tambahTampilan(item);
        if(!item.isComplete){
            tampil.append(element);
        }else{tampil2.append(element)}
    }
   
});

function balikk2(id){
    const todoTarget = cariid(id);
    if(todoTarget == null)return;
        todoTarget.isComplete =true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function balikk(id){
    const todoTarget = cariid(id);

    if(todoTarget == null)return;
    todoTarget.isComplete= false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function hapuss(id){
    const todoTarget =cariid(id);
    
    if(todoTarget === -1)return;
    todos.splice(todoTarget,1);
    alert('Anda Akan Menghapus Buku Ini')
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData()
}


function cariid(id){
    for(const item of todos){
        if (item.id ===id){
            return item;
        }
    }
    return null
}

function saveData(){
    if (isStorageExist()){
        const parsed =JSON.stringify(todos);
        localStorage.setItem(storageKey, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}