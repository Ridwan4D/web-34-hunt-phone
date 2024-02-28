const loadPhone = async (searchText,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phonesData = data.data;
    displayPhones(phonesData,isShowAll)
}



const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    const showBtnDiv = document.getElementById("show-div");
    // clear phone container cards before adding new card
    phoneContainer.textContent = "";

    if(phones.length > 12){
        showBtnDiv.classList.remove("hidden")
    }else{
        showBtnDiv.classList.add("hidden")
    }
    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12)
    }else{
        showBtnDiv.classList.add("hidden")
    }
    phones.forEach(phone => {
        const phoneCard = document.createElement("div");
        phoneCard.classList.add("card", "bg-gray-300", "shadow-lg", "p-2", "md:p-5")
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" class="rounded-lg" /></figure>
        <div class="p-3 space-y-2">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleSpinner(false);
}

//  handle show detail
const handleShowDetail =async (id)=>{
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phoneInfo = data.data
    showPhoneDetails(phoneInfo)
} 

// show phone details
const showPhoneDetails =(phoneInfo) =>{
    console.log(phoneInfo);
    const showDetailContainer = document.getElementById("show-detail-container");
    showDetailContainer.innerHTML = `
    <img src="${phoneInfo.image}" alt="" class="mx-auto my-3">
    <h3 id="show-detail-phone-name" class="font-bold text-2xl">${phoneInfo?.name}</h3>
    <p><span class="font-bold text-lg">Storage: </span>${phoneInfo?.mainFeatures?.storage}</p>
    <p><span class="font-bold text-lg">Display Size: </span>${phoneInfo?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold text-lg">Chipset: </span>${phoneInfo?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold text-lg">Memory: </span>${phoneInfo?.mainFeatures?.memory}</p>
    <p><span class="font-bold text-lg">Slug: </span>${phoneInfo?.slug}</p>
    <p><span class="font-bold text-lg">Release data: </span>${phoneInfo?.releaseDate}</p>
    <p><span class="font-bold text-lg">Brand: </span>${phoneInfo?.brand}</p>
    <p><span class="font-bold text-lg">GPS: </span>${phoneInfo?.others?.GPS}</p>
    <p><span class="font-bold text-lg">WLAN: </span>${phoneInfo?.others?.WLAN}</p>
        
    `
    // show modal
    show_details_modal.showModal()
}

// handle search button
const handleSearch = (isShowAll)=>{
    toggleSpinner(true);
    const searchInput = document.getElementById("search-input");
    const searchText = searchInput.value;
    loadPhone(searchText,isShowAll)
}


const toggleSpinner = (isLoading)=>{
    const loading = document.getElementById("loading-spinner");
    if(isLoading){
        loading.classList.remove("hidden")
    }else{
        loading.classList.add("hidden")
    }
}


// handle show all btn
const handleShowAll = ()=>{
    handleSearch(true)
}