const addButton = document.querySelector('#add');

const updateLSData = () =>
{
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    //humne ek array bna li notes naam ki, ab user jo bhi value daalega wo hum iss array me store krenge
    // and local storage me toh key value pair hota hai...toh sabka ye notes, ek hi key hoga
    console.log(textAreaData);

    textAreaData.forEach((note) =>      //currVal = note (here)
    {
        return notes.push(note.value);       //yaha pe notes array me hum note ki value ko push(Add) kr rhe hai
    })

    console.log(notes);

    localStorage.setItem('notes', JSON.stringify(notes));    //local storage par koi data add krna rha toh setItem and jo kuch bhi store kia hai humne usko get krne ke liye getItem()
    //in the form of key-value pair hume arguments likhne hai.
    // toh key toh note ho gya
    //ye function sirf string(as its second argument) ko hi accept krta haii
    // We can't pass array or object into it...par hmare pass toh final result array or object ke form hai, therefore we're using the stringify method
}

const addNewNote = (text ='') =>
{
    const note = document.createElement('div');
    note.classList.add('note');

    //yaha par hum ek div ko create kr rhe hai and uske ander dynamically class create kr rhe hai 'node'
    //and ab neeche uss div ke ander jo html content aayega usko add kra rhe hai

    const htmlData = 
    `   <div class = "operation">
            <button class = "edit"> <i class = "fas fa-edit"></i></button>
            <button class = "delete"><i class = "fas fa-trash-alt"></i></button>
        </div>

    <div class = "main ${text ? "" : "hidden"}"></div>
    <textarea class = "${text ? "hidden" : ""}"></textarea>`;

    // here we've used ternery operator. Hum ye chahte hai ki agar text phele se likha hua hai toh
    // wo saved hi rhe as it is aur hum usme type na kr paaye(unless and untill edit button press krke edit na krna ho)
    // Aur agar kuch bhi nhi likha hai waha toh hum waha text likh paaye

    // idhar first line says ki if in the main div there is some text--->if true, then do nothing
    // but if false(matlab koi text nhi likha) tab hidden kr do main div ko taaki textArea aa jaye aur hum type kr paaye

    // second line says ki agar phele se koi text likha hai--->if true, toh hidden kr do textArea ko taaki
    // koi type na kr paaye saved data me. And if false(matlab koi text nhi likha), tab toh likh hi skte naaa

    //ab hum using insertAdjacentHTML (jo ki fast hota hai innerHTML se) ko use krenge to add the html content inside the div as its first child(therefore we"ll use afterbegin)

    note.insertAdjacentHTML('afterbegin', htmlData);
    //console.log(note);

    //getting the reference

    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    //deleting the node
    deleteButton.addEventListener('click', ()=>
    {
        note.remove();
        updateLSData();
    })

    //toggle between the main div and the text area using the edit button

    textArea.value = text;
    mainDiv.innerHTML = text;   //now that way both main div and text area will have the same value

    editButton.addEventListener('click', () =>
    {
        mainDiv.classList.toggle('hidden');   //agar hidden hoga toh hta dega aur agar nhi hoga toh add kr dega
        textArea.classList.toggle('hidden');
    })

    //basically we are using the concept of hidden class here
    //initially hmare pass text area hoga jisme hum type kr skte hai, aur agar phele se kuch likha hoga usme toh wo main div class ke ander kaha jayega
    //ek baar me ek hi class par kaam hoga and doosra wala hidden rhega
    //humne css me bhi last me aisa likha hai   hidden{display:none}

    textArea.addEventListener('change', (event)=>     //don't use input here
    {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        //text area me jo bhi likha hai usko hume apne local storage par store krna hoga
        //and jab bhi data change hoga ye wala method call hoga

        updateLSData();     //this function will be defined above
    })

    // textArea.value = text;
    // mainDiv.innerHTML = text;  yhi chhez kri hai humne basically

 

    // Concept of local Storage
    // => The localStorage and the sessionStorage properties allow us to save key/value pairs
    // in a web browser. The localStorage object stores data with no expiration Date.
    // The data will not be deleted when the browser is closed, and will be available the 
    // next day, week or year!


    document.body.appendChild(note);
    //it appends the node as the last child of a node
}

//getting data back from the localStorage

const notes = JSON.parse(localStorage.getItem('notes'));   //parse method is used to get back the original format

if(notes){ notes.forEach((note) => addNewNote(note))};      //har ek note ke liye addNewNote function call krenge

addButton.addEventListener('click', () => addNewNote());