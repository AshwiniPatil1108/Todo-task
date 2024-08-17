const cl = console.log;

const post = document.getElementById("post")
const onstatus = document.getElementById("status")

const TODO_URL =`https://jsonplaceholder.typicode.com/todos`



let todoArray =[];


const templating = (arr)=>{
    let result ='';
    let completed ='';
    arr.forEach((post, i)=>{
        (post.completed === true) ? completed = "Yes":completed = "No"
       
        result+= `
                    <tr>
                        <td>${[i+1]}</td>
                        <td>${post.userId}</td>
                        <td>${post.title}</td>
                        <td>${completed}</td>
                        
                    </tr>
                `
    });

    cl(result);
    post.innerHTML = result;
}
  
const todoArr =(obj)=>{
 
    for(const key in obj){
        todoArray.push({...obj[key]})
    }
    return todoArray
}


const makeApiCall = async (methodName, apiurl, msgbody)=>{
    msgbody = msgbody ? JSON.stringify(msgbody):null

    let res = await fetch(apiurl, {
       method : methodName,
       body: msgbody,
       headers:{
          token :'get a JWT Token from Local storage'
       }
    })
     return res.json()
}

const fetchTodo = async()=>{
    let data = await makeApiCall("GET", TODO_URL);
    let arr = todoArr(data);
    cl(arr)
    templating(arr)
}

fetchTodo()



const onStatusChange =(eve)=>{
    let getClassName = eve.target.value;
	cl(getClassName);
    if(getClassName ==="all"){
        templating(todoArray)
    }else if(getClassName ==="completed"){
        filterValue = todoArray.filter(ele => ele.completed == true );
        templating(filterValue )
    }else{
        filterValue1 = todoArray.filter(ele => ele.completed == false );
        templating(filterValue1)
    }
     
}

onstatus.addEventListener("change", onStatusChange);