// Select elements
const todoInput = document.getElementById('todoInput');
const prioritySelect = document.getElementById('prioritySelect');
const addTodoBtn = document.getElementById('addTodoBtn');
const importantTodos = document.getElementById('importantTodos');
const notImportantTodos = document.getElementById('notImportantTodos');
const clearImportantBtn = document.getElementById('clearImportantBtn');
const clearNotImportantBtn = document.getElementById('clearNotImportantBtn');
let countdown;

function todoListGenerator(todoName, isImportant) {

    let listItem = document.createElement('li')
    listItem.classList.add('todo-item')

    let spanWrapper = document.createElement('div')
    spanWrapper.classList.add('span-wrapper')

    let textSpan = document.createElement('span')
    textSpan.classList.add('todo-text')
    textSpan.innerHTML = todoName

    let spanTimer = document.createElement('span')
    spanTimer.className = 'timer set_timer'
    spanTimer.innerHTML = 'ساعت رو تنظیم کن'
    spanTimer.style.cursor = 'pointer'

    let countdownTodo = document.createElement('div')
    countdownTodo.style.padding = '5px'
    countdownTodo.classList.add('timer_wrapper')
    let hourSpan = document.createElement('span')
    let minuteSpan = document.createElement('span')
    let secundSpan = document.createElement('span')
    countdownTodo.append(hourSpan, minuteSpan, secundSpan)

    let timerInput = document.createElement('input')
    timerInput.type = 'time'
    timerInput.classList.add('timer-input')

    spanTimer.addEventListener('click', () => {
        timerInput.style.display = 'inline';
    });

    timerInput.addEventListener('change', () => {
        timerInput.style.display = 'none';

        // گرفتن تایم سیستم کاربر
        const systemTime = new Date(); // زمان فعلی سیستم
        const currentHours = systemTime.getHours();
        const currentMinutes = systemTime.getMinutes();

        // ورودی کاربر (این مقدار را می‌توان از اینپوت HTML دریافت کرد)
        let userTime = timerInput.value; // مقدار نمونه برای آزمایش
        var userHours = parseInt(userTime.split(":")[0], 10);
        var userMinutes = parseInt(userTime.split(":")[1], 10);

        // محاسبه اختلاف زمانی بین تایم فعلی سیستم و تایم ورودی
        var remainingSeconds =
            (userHours * 3600 + userMinutes * 60) -
            (currentHours * 3600 + currentMinutes * 60);

        // بررسی اگر زمان قبلاً گذشته باشد
        if (remainingSeconds <= 0) {
            alert("زمان ورودی قبلاً گذشته است!");
        } else {
            // شمارش معکوس با استفاده از setInterval
            countdown = setInterval(function () {
                if (remainingSeconds <= 0) {
                    clearInterval(countdown); // متوقف کردن تایمر
                    alert("زمان به پایان رسید!"); // پیام به کاربر
                } else {
                    remainingSeconds--; // کاهش ثانیه‌ها

                    // تبدیل ثانیه‌ها به ساعت، دقیقه و ثانیه
                    var hours = Math.floor(remainingSeconds / 3600);
                    var minutes = Math.floor((remainingSeconds % 3600) / 60);
                    var seconds = remainingSeconds % 60;

                    // نمایش زمان باقی‌مانده
                    console.log(
                        (hours < 10 ? "0" : "") + hours + ":" +
                        (minutes < 10 ? "0" : "") + minutes + ":" +
                        (seconds < 10 ? "0" : "") + seconds
                    );

                    hourSpan.innerHTML = (hours < 10 ? "0" : "") + hours + ":"
                    minuteSpan.innerHTML = (minutes < 10 ? "0" : "") + minutes + ":"
                    secundSpan.innerHTML = (seconds < 10 ? "0" : "") + seconds
                }
            }, 1000); // اجرا هر ۱۰۰۰ میلی‌ثانیه
        }
        // countdownTodo.innerHTML = ''
    });

    let btnsWrapper = document.createElement('div')
    btnsWrapper.classList.add('btns_Wrapper')


    let completeBtn = document.createElement('button')
    completeBtn.classList.add('status-btn')
    completeBtn.innerHTML = 'Done'
    completeBtn.addEventListener('click', function () {
        clearInterval(countdown)
        listItem.classList.toggle('todo-list-bgColor')
        completeBtn.innerHTML = listItem.classList.contains('todo-list-bgColor')
            ? 'Undone'
            : 'Done';
        textSpan.classList.toggle('active-toggle')
        spanTimer.classList.toggle('active-toggle')
        completeBtn.classList.toggle('active-toggle')
        deleteBtn.classList.toggle('active-toggle')
    })

    let deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-btn')
    deleteBtn.innerHTML = 'Remove'
    deleteBtn.addEventListener('click', function () {
        listItem.remove()
    })

    spanWrapper.append(textSpan, spanTimer, timerInput, countdownTodo)
    btnsWrapper.append(completeBtn, deleteBtn)
    listItem.append(spanWrapper, btnsWrapper)


    if (isImportant) {

        importantTodos.append(listItem)
    }

    else {
        notImportantTodos.append(listItem)
    }












}





































// Add todo
addTodoBtn.addEventListener('click', () => {

    let todoTitle = todoInput.value.trim()
    const isImportant = prioritySelect.value === 'important'

    if (!todoTitle) {
        alert('لطفا ورودی هارا تکمیل کنید')
        return;
    }

    todoListGenerator(todoTitle, isImportant)
    todoTitle.value = ''
});


clearImportantBtn.addEventListener('click', function () {
    importantTodos.innerHTML = ''
    todoInput.value = ''
})
clearNotImportantBtn.addEventListener('click', function () {
    notImportantTodos.innerHTML = ''
    todoInput.value = ''
})