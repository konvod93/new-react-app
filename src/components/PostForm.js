import React, { useState } from 'react';
import MyInput from './UI/input/MyInput.js'
import MyButton from './UI/button/MyButton.js'

const PostForm = ({create}) => {
    const [post, setPost] = useState({ title: '', body: '' })

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost)
        setPost({ title: '', body: '' })
    }

    return (
        <form>
            {/* Управляемый компонент */}
            <MyInput
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Название поста"
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
                type="text"
                placeholder="Описание поста"
            />

            {/* Неуправляемый/некконтролируемый компонент */}
            {/* <MyInput
                    ref={bodyInputRef}
                    type='text'
                    placeholder="Описание поста"
                />  */}
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

//не оставляй такие большие коменты ксли это продакшин версия, допускается оставлять "TODO: what i mast to do with code" комментарии

export default PostForm;