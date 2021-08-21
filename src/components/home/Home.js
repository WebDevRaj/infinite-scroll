import { useEffect, useState, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom"
import Loader from "../loader/Loader";

import './home.css'

const Home = ({ auth }) => {
    const pageSize = 6;
    const history = useHistory();
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    const observer = useRef();
    const lastCardRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        })
        if (node) observer.current.observe(node);
    }, [loading, hasMore])

    const getData = () => {
        setLoading(true);
        fetch(`https://reqres.in/api/users?page=${page}&per_page=${pageSize}`)
            .then((res) => res.json())
            .then(data => {
                setTimeout(() => {
                    setData(prevData => [...prevData, ...data.data])
                    setHasMore(page < data.total_pages)
                }, 1000);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getData();
    }, [page])

    const logout = () => {
        auth.signout(() => {
            history.push('/home')
        })
    }

    return (
        <div>
            <div className="header">
                <h1>Home</h1>
                <button className="logoutBtn" onClick={logout}>Logout</button>
            </div>
            <div className="cards_container">
                {data?.length > 0 && data.map((item, i) => data?.length === i + 1 ? (
                    <div ref={lastCardRef} className="card" key={i}>
                        <div className="card_info">
                            <span className="name">{item.first_name} {item.last_name}</span>
                            <span >{item.email}</span>
                        </div>
                        <img src={item.avatar} alt={item.first_name} />
                    </div>
                ) : <div className="card" key={i}>
                    <div className="card_info">
                        <span className="name">{item.first_name} {item.last_name}</span>
                        <span >{item.email}</span>
                    </div>
                    <img src={item.avatar} alt={item.first_name} />
                </div>)}
                {loading && <div className="card loading" > <Loader /></div>}
            </div>
        </div>
    )
}

export default Home;