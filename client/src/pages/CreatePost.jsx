import React, { useState } from 'react'
import "./CreatePost.css"
import { Navigate } from 'react-router-dom'
import ReactQuill from "react-quill" //code editor api 
import 'react-quill/dist/quill.snow.css'; //for the style of the code editor 


function CreatePost() {

    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
    };
    const [open,setOpen] = useState(false)//for opening the plus button of the image
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [value, setValue] = useState("")
    const [files, setFiles] = useState('')
    const [redirect, setRedirect] = useState(false)

   async function createNewPost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', value);
        data.set('file', files[0])
        ev.preventDefault()
        
        const response = await fetch('https://blogdeploy-vghx.vercel.app/post',{
            method: 'POST',
            body: data,
            credentials:'include',
        })
        if(response.ok){
          setRedirect(true)
        }
        else{
          alert('Post Not Created!')
        }
    }

if(redirect){
   return <Navigate to={'/'} />
}
  return (
    <>
        <input type="text" 
        placeholder='Title' 
        className='title dark:text-white'
        value={title} 
        onChange={(e)=> setTitle(e.target.value)}/>

        <input type="text" 
        placeholder='Summary' 
        className='summary dark:text-white'
        value={summary} 
        onChange={(e)=>setSummary(e.target.value)}/>

            <input type="file"
             onChange={ev => setFiles(ev.target.files)} className='file_input dark:text-white'/>
        <div className='editor'>
            <ReactQuill
            className='textArea dark:text-white'
            theme={'snow'} 
            value={value} 
            onChange={setValue}
            modules={modules}
            placeholder='Tell Your Story...'/>
        </div>
        <button className='publish' onClick={createNewPost}>Post🚀</button>
        </>
  )
}

export default CreatePost
