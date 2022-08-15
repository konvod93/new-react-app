import React, { useState, useEffect, useRef } from "react";
import { usePosts } from "../components/hooks/usePosts";
import { useFetching } from "../components/hooks/useFetching";
import { getPageCount } from "../components/utils/pages";
import { useObserver } from "../components/hooks/useObserver";
import PostList from "../components/PostList"
import MyButton from "../components/UI/button/MyButton.js"
import PostForm from "../components/PostForm.js"
import PostFilter from "../components/PostFilter.js";
import MyModal from "../components/UI/MyModal/MyModal";
import PostService from "../API/PostService.js";
//import Loader from "../components/UI/Loader/Loader"; not uses we mast remove it
import Pagination from "../components/UI/pagination/Pagination";
import MySelect from "../components/UI/select/MySelect";
import "../styles/App.css";

// придерживайся павильной структуры

function Posts() {

    // const [value, setValue] = useState('ТЕКСТ В ИНПУТЕ')
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();
    
    //console.log(lastElement)

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const changePage = (page) => {
        setPage(page)

    }

    // Получаем post из дочернего компонента

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


    // const [title, setTitle] = useState('')
    // const [body, setBody] = useState('')

    // const bodyInputRef = useRef();


    return (
        <div className="App">
            {/* <Counter/> */}
            {/* <ClassCounter/> */}
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue = "Количество элементов на странице"
                options = {[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS' />
            <div ref={lastElement} style={{ height: 20, background: 'red' }}></div>
            {
                isPostsLoading && <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты про JS' />
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
