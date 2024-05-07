    Echo.private('notification')
        .listen('.book.notification', (e) => {
        console.log('Hello');
    });

    Echo.private('articlenotification')
    .listen('.article.notification', (e) => {
    //    alert(e.articles);
        console.log(e.article);
        const article = e.article;
        updateUI(article);
    });

    // Echo.private('articlenotification')
    // .notification((notification) => {
    //    console.log(notification.type);
    // });


    // function updateUI(articles) {
    //     // if (typeof articles === 'string') {
    //     //     articles = JSON.parse(articles);
    //     // }

    //     const articleContainer = document.querySelector('.articles-container');
    //     articleContainer.innerHTML = '';

    //     articles.forEach(article => {
    //         const articleElement = document.createElement('div');
    //         articleElement.textContent = `${article.title} posted by ${article.user.name}`;


    //         articleContainer.appendChild(articleElement);
    //     });
    // }


    function updateUI(article) {
        const articlesContainer = document.getElementById('articles-container');

        const articleLink = document.createElement('a');
        articleLink.href = `/articles/detail/${article.id}`;

        const articleDiv = document.createElement('div');
        const articleTitle = document.createElement('span');
        articleTitle.className = 'h2';
        articleTitle.textContent = `${article.title} is posted.`;

        articleDiv.appendChild(articleTitle);
        articleLink.appendChild(articleDiv);

        // Prepend the new article link to the container
        articlesContainer.insertBefore(articleLink, articlesContainer.firstChild);

        // Optional: Limit the number of items to show only the 5 latest articles
        while (articlesContainer.children.length > 5) {
            articlesContainer.removeChild(articlesContainer.lastChild); // Remove the oldest article from the list
        }
    }


