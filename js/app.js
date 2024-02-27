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
            <div class="card-actions justify-start">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    toggleSpinner(false);
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