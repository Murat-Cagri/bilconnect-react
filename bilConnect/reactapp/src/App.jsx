import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import SearchBar from './SearchBar.jsx';
import ActionsMenu from './ActionsMenu.jsx';
import { useNavigate } from 'react-router-dom';
import Post from './Post.jsx';

const App = ({ posts }) => {
    const navigate = useNavigate();
    const imagePreloader = new Image();

    const [state, setState] = useState({
        currentIndex: 0,
        isTransitioning: false,
        isContentVisible: false,
        intervalId: null,
        filteredPosts: posts,  // Add filteredPosts state
    });

    const { currentIndex, isTransitioning, isContentVisible, intervalId, filteredPosts } = state;

    const data = [
        {
            image: 'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=1380&t=st=1702406519~exp=1702407119~hmac=4c2580ae8ce142a4d706d053b4585be156f9d3de90ff64dda184f41690d62fd0',
        },
        {
            image: 'https://images.squarespace-cdn.com/content/v1/5aadc54285ede1bd72181a3a/1521339647830-LKHTH62ZRY5TCGVCW81P/shutterstock_538256848.jpg?format=1500w',
        },
    ];

    const startTimer = () => {
        const newIntervalId = setInterval(() => {
            setState((prevState) => ({
                ...prevState,
                currentIndex: (prevState.currentIndex + 1) % data.length,
                isTransitioning: true,
            }));

            setTimeout(() => {
                setState((prevState) => ({ ...prevState, isTransitioning: false }));
            }, 200);
        }, 7000);

        setState((prevState) => ({ ...prevState, intervalId: newIntervalId }));
    };

    useEffect(() => {
        if (!intervalId) {
            startTimer();
        }
        return () => clearInterval(intervalId);
    }, [intervalId, data]);

    const handleAnimateClick = (direction) => {
        clearInterval(intervalId);

        const currentIdx = currentIndex;
        const newIndex =
            direction === 'next'
                ? (currentIdx + 1) % data.length
                : (currentIdx - 1 + data.length) % data.length;

        imagePreloader.src = data[newIndex].image;

        setState((prevState) => ({
            ...prevState,
            currentIndex: newIndex,
            isTransitioning: true,
        }));

        setTimeout(() => {
            setState((prevState) => ({ ...prevState, isTransitioning: false }));
            startTimer();
        }, 200);
    };

    const openTaskbar = () => {
        setState((prevState) => ({
            ...prevState,
            isContentVisible: !prevState.isContentVisible,
        }));
    };

    const toggleMainPage = () => {
        window.location.reload();
    };

    const handleDotClick = (index) => {
        clearInterval(intervalId);

        setState((prevState) => ({
            ...prevState,
            currentIndex: index,
            isTransitioning: true,
        }));

        setTimeout(() => {
            setState((prevState) => ({ ...prevState, isTransitioning: false }));
            startTimer();
        }, 200);
    };

    const dots = Array.from({ length: data.length }, (_, index) => (
        <span
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => handleDotClick(index)}
        />
    ));

    const searchPosts = (keyword) => {
        const lowerCaseKeyword = keyword.trim().toLocaleLowerCase('tr-TR');
        const filtered = posts.filter((post) =>
            post.title.trim().toLocaleLowerCase('tr-TR').includes(lowerCaseKeyword)
        );
        setState((prevState) => ({ ...prevState, filteredPosts: filtered }));
    };


    return (
        <div className="ms-Grid" dir="ltr">
            <div className="ms-Grid-row">
                <div className={`${styles.header}`}>
                    <button
                        type="button"
                        onClick={toggleMainPage}
                        style={{ background: 'transparent', border: 'none', outline: 'none' }}
                    >
                        <img
                            height={100}
                            src={
                                'https://github.com/Murat-Cagri/bilconnectImages/blob/main/BILCONNECT_LOGO.png?raw=true'
                            }
                            className={`${styles.logo}`}
                            alt="BILCONNECT_LOGO"
                        />
                    </button>
                    <div className={`${styles.SearchBar}`}>
                        <SearchBar
                            isContentVisible={isContentVisible}
                            openTaskbar={openTaskbar}
                            search={searchPosts}
                        />
                    </div>
                    <div className={`${styles.actionsMenu}`}>
                        {!isContentVisible && <ActionsMenu className={`${styles.actionsMenu}`} />}
                    </div>
                </div>
                <div className={`${styles.animatedBlockWrapper}`}>
                    <div className={`${styles.animatedImageWrapper}`}>
                        <img
                            src={data[currentIndex].image}
                            alt="Post Image"
                            className={`${styles.animatedImage} ${isTransitioning ? styles.fade : ''}`}
                        />
                    </div>
                </div>
                <div className={`${styles.navigationButtons}`}>
                    <button
                        className={`${styles.navigationButton}`}
                        onClick={() => handleAnimateClick('prev')}
                    >
                        {'<'}
                    </button>
                    {dots}
                    <button
                        className={`${styles.navigationButton}`}
                        onClick={() => handleAnimateClick('next')}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
            <div>
                <Post posts={filteredPosts} /> {/* Use filteredPosts instead of posts */}
            </div>
        </div>
    );
};

export default App;
