'use strict';

const optArticleSelector = '.post';
const  optTitleSelector = '.post-title';
const  optTitleListSelector = '.titles';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;

  //console.log('Link was clicked!');
  //console.log('event');
  //console.log('clickedElement (with plus): ' + clickedElement);

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks) {
    activeLink.classList.remove('active');
    //console.log('aktiveLinks');
  }

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  //console.log('clickedElement:', clickedElement);

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');

  for(let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

 

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log(targetArticle);
}

function generateTitleLinks(customSelector = '') {
    
    console.log(customSelector);
  
    /* [DONE] remove contents of TitleList */
  
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
  
    /* find all the articles and save them to variable: articles */
  
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    console.log(optArticleSelector + customSelector);
    for(let article of articles){
  
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log('articleId');
  
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
      /* [DONE] create HTML of the link */
  
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log('Created HTML of the link');
  
      /* [DONE] insert link into html variable */
  
      html = html + linkHTML;
      //console.log(html);
    }
  
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
      //console.log(link);
    }
  }
  
  generateTitleLinks();