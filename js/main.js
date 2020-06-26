'use strict';

var COMMENT_MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENT_NAMES = ['Максим', 'Тимофей', 'Андрей', 'Артем', 'Игорь', 'Маргарита'];
var PICTURE_DESCRIPTIONS = ['Я', 'Снова я', 'Мои друзья', 'Мои любимые места', 'Игорь', 'Да-да, снова Игорь', 'Ох, уж этот вездесущий Игорь', 'Игорь хочет быть на каждом фото', 'Хобби Игоря', 'Что делать, если ты не Игорь', 'Все лежат, а Игорь просто взял и сел', 'Igor, pull the switch', 'Игорь и пельмени с Урала', 'Игорь и Белые ночи', 'Культурная жизнь Игоря', 'Кулинарные пристрастия Игоря', 'Судя по фото, это уже не мой аккаунт', 'Рейдерский захват аккаунта от Игоря', 'Власть Игоря', 'Позорное бегство', 'Чистосердечное признание', 'Узник замка Иф', 'Отверженные и удивленные', 'Униженные и потаенные', 'Гражданские права и где они обитают'];
var PICTURES_AMOUNT = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_AMOUNT_MIN = 0;
var COMMENTS_AMOUNT_MAX = 5;

var getRandomElement = function (a, b) {
  return Math.floor(Math.random() * (b - a + 1));
};

var getComments = function (count) {
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push({
      avatar: 'img/avatar-' + (getRandomElement(COMMENTS_AMOUNT_MIN, COMMENTS_AMOUNT_MAX) + 1) + '.svg',
      message: COMMENT_MESSAGES[getRandomElement(COMMENTS_AMOUNT_MIN, COMMENTS_AMOUNT_MAX)],
      name: COMMENT_NAMES[getRandomElement(COMMENTS_AMOUNT_MIN, COMMENTS_AMOUNT_MAX)]
    }
    );
  }
  return result;
};

var getPhotoArray = function (amount) {
  var photos = [];
  for (var i = 1; i <= amount; i++) {
    photos.push('photos/' + i + '.jpg');
  }
  return photos;
};

var getUniqueElementFromArray = function (array) {
  var index = getRandomElement(0, array.length - 1);
  return array.splice(index, 1);
};

var photoUrl = getPhotoArray(PICTURES_AMOUNT);
var picturesElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

var getPictureArray = function (count) {
  var pictures = [];
  for (var j = 0; j < count; j++) {
    pictures[j] = {
      url: getUniqueElementFromArray(photoUrl),
      description: PICTURE_DESCRIPTIONS[j],
      likes: getRandomElement(LIKES_MIN, LIKES_MAX),
      comments: getComments(getRandomElement(COMMENTS_AMOUNT_MIN + 1, COMMENTS_AMOUNT_MAX + 1))
    };
  }
  return pictures;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  var pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = picture.url;
  pictureImg.alt = picture.description;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  return pictureElement;
};

var fragment = document.createDocumentFragment();
var pictureArray = getPictureArray(PICTURES_AMOUNT);
pictureArray.forEach(function (picture) {
  fragment.appendChild(renderPicture(picture));
});
picturesElement.appendChild(fragment);

var userDialog = document.querySelector('.big-picture');
userDialog.classList.remove('hidden');

var bigPictureImg = userDialog.querySelector('.big-picture__img').querySelector('img');
bigPictureImg.src = pictureArray[0].url;
var bigPictureLikes = userDialog.querySelector('.likes-count');
bigPictureLikes.textContent = pictureArray[0].likes;
var bigPictureComments = userDialog.querySelector('.comments-count');
bigPictureComments.textContent = pictureArray[0].comments.length;
var commentsList = userDialog.querySelector('.social__comments');

var socialFragment = document.createDocumentFragment();
var socialComments = pictureArray[0].comments;
socialComments.forEach(function (comment) {
  var socialElement = commentsList.querySelector('.social__comment').cloneNode(true);
  var socialElementImg = socialElement.querySelector('img');
  socialElementImg.src = comment.avatar;
  socialElementImg.alt = comment.name;
  socialElement.querySelector('.social__text').textContent = comment.message;
  socialFragment.appendChild(socialElement);
});
commentsList.appendChild(socialFragment);

var socialCaption = userDialog.querySelector('.social__caption');
socialCaption.textContent = pictureArray[0].description;

userDialog.querySelector('.social__comment-count').classList.add('hidden');
userDialog.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');
