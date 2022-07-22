'use strict';

//const templates = {
  
//articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
//tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
//authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
//tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
//authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),

//};

const  optArticleSelector = '.post';
const  optTitleSelector = '.post-title';
const  optTitleListSelector = '.titles';
const  optArticleTagsSelector = '.post-tags .list';
const  optArticleAuthorSelector = '.post-author';
const  optTagsListSelector = '.tags.list';
const  optCloudClassCount = '4';
const  optCloudClassPrefix = 'tag-size-';
const  optAuthorsListSelector = '.authors.list';

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
    
  //console.log(customSelector);
  
  /* [DONE] remove contents of TitleList */
  
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  
  /* find all the articles and save them to variable: articles */
  
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  //console.log(optArticleSelector + customSelector);
  for(let article of articles){
  
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    //console.log('articleId:', articleId);
  
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
    //console.log(links);
  }
}
  
generateTitleLinks();

function calculateTagsParams(tags) {

  const params = {max: 0, min: 9999};
  for(let tag in tags){
    //console.log(tag + 'is used' + tags[tag] + 'times');

    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

function calculateTagClass(count, params) {
  
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  
  return optCloudClassPrefix + classNumber;
}


function generateTags() {
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles) {
  /* find tags wrapper */
    const titleList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {
      //console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '<span></a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log(html);  
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }  
    /* insert HTML of all the links into the tags wrapper */
    titleList.innerHTML = html;
    /* END LOOP: for every article: */
  }
  /*[NEW] find list of tags in right column*/
  const tagList = document.querySelector(optTagsListSelector);
  /* [NEW] add html from allTagsHTML to tagList */
  //tagList.innerHTML = allTags.join(' ');
  //console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /*NEW create variable for all links HTML code */
  let allTagsHTML = '';
  /*NEW start LOOP for each tag in allTags */
  for(let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '(' + calculateTagClass(allTags[tag], tagsParams) + ')'</span></a></li>';
    const tagLinkHTML = '<li><a class=' + calculateTagClass(allTags[tag], tagsParams) + ' href="#tag-' + tag + '">' + tag + '</a></li>';
    //const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
    console.log('tagLinkHTML:', tagLinkHTML);
    /*generate code of link and add it to allTagsHTML */
    allTagsHTML += tagLinkHTML;
  }
  
  /*NEW add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  
}
  
generateTags();
  

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(activeTagLinks);
  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks) {
  /* remove class active */
    activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
  for(let tagLink of tagLinks) {
  /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}
  
function addClickListenersToTags(){
  /* find all links to tags */
  const allTagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let allTagsLink of allTagsLinks){
    /* add tagClickHandler as event listener for that link */
    allTagsLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
  
addClickListenersToTags();

function generateAuthors(){
  let allAuthors = {};
  //console.log('Authors were generated');
  /* [DONE] Find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);
  /* [DONE] Start loop for every article */
  for(let article of articles){
    /* [DONE] find authors wrapper */
    const titleList = article.querySelector(optArticleAuthorSelector);
    //console.log(article);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);
    /* [DONE] generate HTML of the link */
    const linkHTML = '<a href ="#author' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
    //console.log(linkHTML);
    /* [DONE] add generated code to html variable */
    html = html + linkHTML;
    //console.log(html);
    /* [NEW] check if this link is NOT already in allTags */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      /* [NEW] add generated code to allTags array */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    /* [DONE] insert HTML of all the links into the authors wrapper */
    titleList.innerHTML = html;
    //console.log('allAuthors:', allAuthors);
    /* [DONE] End loop for every article */
    
  }
  const authorList = document.querySelector(optAuthorsListSelector);
  let allAuthorsHTML = '';
  for(let author in allAuthors) {
    const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + '</a>(' + allAuthors[author] + ')</li>';
    allAuthorsHTML += authorLinkHTML;
  }
  authorList.innerHTML = allAuthorsHTML;
}

generateAuthors();
    
function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  /* START LOOP: for each active author link */
  for(let activeAuthorLink of activeAuthorLinks){
    /* remove class active */
    activeAuthorLink.classList.remove('active');
    /* END LOOP: for each active author link */
  }
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found author link */
  for(let authorLink of authorLinks){
    /* add class active */
    authorLink.classList.add('active');
    /* END LOOP: for each found author link */
  }
  /* execute function "generateTitleLinks" with article selector as argument*/
  generateTitleLinks('[data-author="' + author + '"]');
}
  
function addClickListenersToAuthors(){
  /* find all links to authors */
  const allLinksToAuthor = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let link of allLinksToAuthor) {
    /* add authorClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}  

addClickListenersToAuthors();