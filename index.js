import { catsData } from '/data.js'

const emotionRadiosEl = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const animatedGif = document.getElementById('gifs-only-option')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeCloseBtn = document.getElementById('meme-modal-close-btn')


emotionRadiosEl.addEventListener('change', highlightCheckedOption)

memeCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

    /* Changing style of selected radio element  */ 

function highlightCheckedOption(e) {
    const radioArr = document.getElementsByClassName('radio')
    for (let radioEL of radioArr) {
        radioEL.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

    /* Closing modal window */

function closeModal() {
    memeModal.style.display = 'none'
}

    /* Rendering cats meme at modal window */

function renderCat() {
    const catObject =  getSingleCatObject()
       memeModalInner.innerHTML = `
                                   <img
                                   class="cat-img"
                                   src="./images/${catObject.image}"
                                   alt="${catObject.alt}"
                                   >
                                   `
       memeModal.style.display = 'flex'
}


    /* Getting a single object from catsData Array with selected options */ 

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1) {
        return catsArray[0]
    } else {
        const randomNumber = Math.floor(Math.random() * catsArray.length) 
        return catsArray[randomNumber]
    }
}

    /* Getting array with selected options  */ 

function getMatchingCatsArray() {
   
    if(document.querySelector('input[type="radio"]:checked')) {
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = animatedGif.checked
    
    
    const matchingCatsArray = catsData.filter(function(selectedItem){
        if(isGif) {
            return selectedItem.emotionTags.includes(selectedEmotion) && selectedItem.isGif
        } else {
             return selectedItem.emotionTags.includes(selectedEmotion)
            }
    })

    return matchingCatsArray
    }
}

  

function getEmotionsArray(cats){
    const catEmotionArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags){
            if(!catEmotionArray.includes(emotion)){
                catEmotionArray.push(emotion)
            }
            
        }
    }
    return catEmotionArray
}

    /* Rendering emotions for choosing cats meme */ 

function renderEmotionsRadios(cats) {
    const emotions = getEmotionsArray(cats)
    let radioItems = ''
    for (let emotionEl of emotions) {
        radioItems += `<div class="radio"
                            <label for="${emotionEl}">${emotionEl}</label>
                            <input
                            type="radio"
                            id="${emotionEl}"
                            value="${emotionEl}"
                            name="emotions">
                            </>
                        </div>`
    }
    emotionRadiosEl.innerHTML = radioItems
}

renderEmotionsRadios(catsData)