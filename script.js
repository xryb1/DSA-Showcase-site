document.addEventListener('DOMContentLoaded', () => {
    const articles = document.querySelectorAll('article');
    const links = document.querySelectorAll('.side-menu a');
    const sideNav = document.querySelector('.side-nav');

 
    function toggleSideNav() {
        if (sideNav.style.transform === 'translateX(0px)') {
            sideNav.style.transform = 'translateX(-200px)'; 
        } else {
            sideNav.style.transform = 'translateX(0)'; 
        }
    }


    links.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const target = link.getAttribute('href').substring(1);
            

           
            const currentArticle = Array.from(articles).find(article => 
                article.classList.contains('fade-in'));

            if (currentArticle) {
               
                currentArticle.classList.remove('fade-in');
                currentArticle.classList.add('fade-out');
                
               
                await new Promise(resolve => setTimeout(resolve, 500));
                
                currentArticle.classList.remove('fade-out');
                currentArticle.style.display = 'none';
                currentArticle.style.visibility = 'hidden';
            }

       
            const newArticle = document.getElementById(target);
            if (newArticle) {
                newArticle.style.display = 'block';
                newArticle.style.visibility = 'visible';
                newArticle.classList.add('fade-in');
            }
        });
    });


    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            
            console.log('Form submitted:', data);
            alert('Message sent! (This is a demo)');
            contactForm.reset();
        });
    }

  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    
    let currentArray = [];

   
    window.insertElement = function() {
        const num = parseInt(document.getElementById('arrayInput').value);
        const index = parseInt(document.getElementById('arrayIndex').value);
        
        if (isNaN(num)) {
            showResult('Please enter a valid number');
            return;
        }

        if (isNaN(index)) {
            currentArray.push(num);
        } else if (index >= 0 && index <= currentArray.length) {
            currentArray.splice(index, 0, num);
        } else {
            showResult('Invalid index');
            return;
        }

        updateArrayDisplay('array-display');
        updateArrayDisplay('sort-array-display');
        updateArrayDisplay('search-array-display');
        showResult(`Inserted ${num} successfully`);
        
    
        document.getElementById('arrayInput').value = '';
        document.getElementById('arrayIndex').value = '';
    }

    window.deleteElement = function() {
        const index = parseInt(document.getElementById('arrayIndex').value);
        
        if (isNaN(index) || index < 0 || index >= currentArray.length) {
            showResult('Invalid index');
            return;
        }

        const deleted = currentArray.splice(index, 1)[0];
        updateArrayDisplay('array-display');
        updateArrayDisplay('sort-array-display');
        updateArrayDisplay('search-array-display');
        showResult(`Deleted ${deleted} at index ${index}`);
        

        document.getElementById('arrayIndex').value = '';
    }

    window.searchElement = function() {
        const num = parseInt(document.getElementById('arrayInput').value);
        if (isNaN(num)) {
            showResult('Please enter a valid number');
            return;
        }

        const index = currentArray.indexOf(num);
        if (index !== -1) {
            showResult(`Found ${num} at index ${index}`);
          
            const elements = document.querySelectorAll('.array-element');
            elements[index].style.backgroundColor = 'rgba(0, 255, 0, 0.3)';
            setTimeout(() => {
                elements[index].style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }, 1500);
        } else {
            showResult(`${num} not found in array`);
        }
        
 
        document.getElementById('arrayInput').value = '';
    }

 
    function updateArrayDisplay(containerId) {
        const display = document.getElementById(containerId);
        if (!display) return;
        
        display.innerHTML = '';
        currentArray.forEach((num, idx) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = num;
            element.setAttribute('data-index', idx);
            display.appendChild(element);
        });
    }

    window.generateRandomArray = function() {
        currentArray = Array.from({length: 8}, () => Math.floor(Math.random() * 100));
        updateArrayDisplay('sort-array-display');
    }

    
    let bubbleSortArray = [];
    let quickSortArray = [];
    let selectionSortArray = [];

    window.generateRandomArrayBubble = function() {
        bubbleSortArray = Array.from({length: 8}, () => Math.floor(Math.random() * 100));
        updateSpecificArrayDisplay('bubble-sort-display', bubbleSortArray);
    }

    window.generateRandomArrayQuick = function() {
        quickSortArray = Array.from({length: 8}, () => Math.floor(Math.random() * 100));
        updateSpecificArrayDisplay('quick-sort-display', quickSortArray);
    }

    window.generateRandomArraySelection = function() {
        selectionSortArray = Array.from({length: 8}, () => Math.floor(Math.random() * 100));
        updateSpecificArrayDisplay('selection-sort-display', selectionSortArray);
    }

    function updateSpecificArrayDisplay(containerId, array) {
        const display = document.getElementById(containerId);
        if (!display) return;
        
        display.innerHTML = '';
        array.forEach((num, idx) => {
            const element = document.createElement('div');
            element.className = 'array-element';
            element.textContent = num;
            element.setAttribute('data-index', idx);
            display.appendChild(element);
        });
    }

    window.bubbleSort = async function() {
        const arr = [...bubbleSortArray];
        const n = arr.length;
        
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    bubbleSortArray = [...arr];
                    updateSpecificArrayDisplay('bubble-sort-display', bubbleSortArray);
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }
    }

    window.quickSort = async function() {
        const arr = [...quickSortArray];
        await quickSortHelper(arr, 0, arr.length - 1);
    }

    async function quickSortHelper(arr, low, high) {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        }
    }

    async function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                quickSortArray = [...arr];
                updateSpecificArrayDisplay('quick-sort-display', quickSortArray);
                await new Promise(resolve => setTimeout(resolve, 300));
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        quickSortArray = [...arr];
        updateSpecificArrayDisplay('quick-sort-display', quickSortArray);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return i + 1;
    }

    window.selectionSort = async function() {
        const arr = [...selectionSortArray];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            
            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }

            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
                selectionSortArray = [...arr];
                updateSpecificArrayDisplay('selection-sort-display', selectionSortArray);
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    }


    document.addEventListener('DOMContentLoaded', () => {
        generateRandomArrayBubble();
        generateRandomArrayQuick();
        generateRandomArraySelection();
    });

    
    function linearSearch() {
        const num = parseInt(document.getElementById('searchInput').value);
        if (isNaN(num)) {
            document.getElementById('search-result').textContent = 'Please enter a valid number';
            return;
        }

        const index = currentArray.indexOf(num);
        if (index !== -1) {
            document.getElementById('search-result').textContent = `Found ${num} at index ${index}`;
        } else {
            document.getElementById('search-result').textContent = `${num} not found in array`;
        }
    }

    async function binarySearch() {
        const num = parseInt(document.getElementById('searchInput').value);
        if (isNaN(num)) {
            document.getElementById('search-result').textContent = 'Please enter a valid number';
            return;
        }

        const elements = document.querySelectorAll('#search-array-display .array-element');
        let left = 0;
        let right = window.searchArray.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            for (let i = left; i <= right; i++) {
                elements[i].style.backgroundColor = 'rgba(255, 165, 0, 0.3)';
            }
            elements[mid].style.backgroundColor = 'rgba(255, 165, 0, 0.7)';
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (window.searchArray[mid] === num) {
                elements[mid].style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
                document.getElementById('search-result').textContent = `Found ${num} at index ${mid}`;
                return;
            }

          
            for (let i = left; i <= right; i++) {
                elements[i].style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }

            if (window.searchArray[mid] < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        document.getElementById('search-result').textContent = `${num} not found in array`;
        elements.forEach(el => el.style.backgroundColor = 'rgba(255, 255, 255, 0.2)');
    }

 
    function showResult(message) {
        document.getElementById('operation-result').textContent = message;
    }

  
    generateRandomArray();

    window.generateRandomArrayBasic = function() {
        currentArray = Array.from({length: 8}, () => Math.floor(Math.random() * 100));
        updateArrayDisplay('array-display');
        showResult('Generated new random array');
    }

    document.addEventListener('DOMContentLoaded', () => {
        const basicOpsArticle = document.getElementById('array-operations');
        if (basicOpsArticle) {
            generateRandomArrayBasic();
        }
    });

    window.generateRandomArraySearch = function() {
   
        const array = Array.from({length: 10}, () => Math.floor(Math.random() * 100));
        array.sort((a, b) => a - b);
        
   
        const displayElement = document.getElementById('search-array-display');
        if (displayElement) {
            displayElement.style.display = 'flex';
            displayElement.style.visibility = 'visible';
            displayElement.innerHTML = array.map(num => 
                `<div class="array-element">${num}</div>`
            ).join('');
        }
        
        
        window.searchArray = array;
        
    
        const searchResult = document.getElementById('search-result');
        if (searchResult) {
            searchResult.textContent = '';
        }
    }

    window.linearSearch = async function() {
        const num = parseInt(document.getElementById('searchInput').value);
        if (isNaN(num)) {
            document.getElementById('search-result').textContent = 'Please enter a valid number';
            return;
        }

        const elements = document.querySelectorAll('#search-array-display .array-element');
        
        for (let i = 0; i < window.searchArray.length; i++) {
       
            elements[i].style.backgroundColor = 'rgba(255, 165, 0, 0.5)';
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (window.searchArray[i] === num) {
                elements[i].style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
                document.getElementById('search-result').textContent = `Found ${num} at index ${i}`;
                return;
            }
            elements[i].style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; 
        }
        
        document.getElementById('search-result').textContent = `${num} not found in array`;
    }

    window.binarySearch = async function() {
        const num = parseInt(document.getElementById('searchInput').value);
        if (isNaN(num)) {
            document.getElementById('search-result').textContent = 'Please enter a valid number';
            return;
        }

        const elements = document.querySelectorAll('#search-array-display .array-element');
        let left = 0;
        let right = window.searchArray.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
           
            for (let i = left; i <= right; i++) {
                elements[i].style.backgroundColor = 'rgba(255, 165, 0, 0.3)';
            }
            elements[mid].style.backgroundColor = 'rgba(255, 165, 0, 0.7)';
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (window.searchArray[mid] === num) {
                elements[mid].style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
                document.getElementById('search-result').textContent = `Found ${num} at index ${mid}`;
                return;
            }

          
            for (let i = left; i <= right; i++) {
                elements[i].style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }

            if (window.searchArray[mid] < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        document.getElementById('search-result').textContent = `${num} not found in array`;
        elements.forEach(el => el.style.backgroundColor = 'rgba(255, 255, 255, 0.2)');
    }

    
    document.addEventListener('DOMContentLoaded', () => {
   
        generateRandomArraySearch();
        
        
        const generateButton = document.querySelector('button[onclick="generateRandomArraySearch()"]');
        if (generateButton) {
            generateButton.addEventListener('click', (e) => {
                e.preventDefault();
                generateRandomArraySearch();
            });
        }
    });

    let countingSortArray = [];

    window.generateRandomArrayCounting = function() {
        countingSortArray = Array.from({length: 10}, () => Math.floor(Math.random() * 100));
        updateSpecificArrayDisplay('counting-sort-display', countingSortArray);
    }

    window.countingSort = function() {
        const arr = [...countingSortArray];
        const max_val = Math.max(...arr);
        const count = new Array(max_val + 1).fill(0);
        
        for (let num of arr) {
            count[num]++;
        }
        
        const sorted_arr = [];
        for (let i = 0; i < count.length; i++) {
            while (count[i] > 0) {
                sorted_arr.push(i);
                count[i]--;
            }
        }
        
        countingSortArray = sorted_arr;
        updateSpecificArrayDisplay('counting-sort-display', countingSortArray);
        showResult('Counting Sort completed');
    }

    
    function updateSpecificArrayDisplay(elementId, array, currentIndex) {
        const displayElement = document.getElementById(elementId);
        displayElement.innerHTML = array.map((num, idx) => {
            const isCurrent = idx === currentIndex ? 'highlight' : ''; 
            return `<div class="array-element ${isCurrent}">${num}</div>`;
        }).join('');
    }
});
