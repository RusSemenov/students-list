//Функция добавления студента на сервер
async function addStudentServer(obj) {
  let response = await fetch(`http://localhost:3000/api/students`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(obj)
  })
  let date = await response.json()
  return date
}

//Функция получения списка студентов
async function getStudentsServer() {
  let response = await fetch(`http://localhost:3000/api/students`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json'}
  })
  let date = await response.json()
  return date
}

//Функция удаления студента с сервера
async function deleteStudentServer(id) {
  let response = await fetch(`http://localhost:3000/api/students/` + id, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json'}
  })
  let date = await response.json()
  return date
}

let studentsList = []
let getServerData = await getStudentsServer()
if (getServerData) {
  studentsList = getServerData
}

//Функция преобразования даты рождения в привычный вид
function getDateBirth(date) {
 let result = date.getDate() < 10 ? '0' + date.getDate() + '.' : date.getDate() + '.'
 result = result + (date.getMonth() < 9 ? '0' + (date.getMonth() + 1) + '.' : (date.getMonth() + 1) + '.')
 result = result + date.getFullYear()
 return result
}

//Функция вывода лет/год/года
function agetost(age) {
  let txt,
      count = age % 100;
      if (count >= 5 && count <= 20 || count >= 25 && count <= 30 || count >= 35 && count <= 40 || count >= 45 && count <= 50) {
        txt = 'лет'
      } else if (count == 1 || count == 21 || count == 31 || count == 41) {
        txt = 'год'
      } else {
        txt = 'года'
      }
      return `${age} ${txt}`
}

//Функция вычисления возраста из даты рождения
function calculateAge(birthDate, otherDate = new Date()) {
  birthDate = new Date(birthDate);
  otherDate = new Date(otherDate);
  let years = (otherDate.getFullYear() - birthDate.getFullYear());
  if (otherDate.getMonth() < birthDate.getMonth() ||
      otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
      years--;
  }
  return years;
}

//Функция вывода года обучения и номер курса
function getYearStart(date) {
  const course = new Date().getFullYear() - date
  if (course > 4 || course == 4 && new Date().getMonth() > 7) {
    return `${parseInt(date)} - ${parseInt(date) + 4} (закончил)`
  }else if (course <= 4) {
    return `${parseInt(date)} - ${parseInt(date) + 4} (${course} курс)`
  }else if (new Date().getMonth() > 7) {
    return `${parseInt(date)} - ${parseInt(date) + 4} (${++course} курс)`
  }
}

//функцию вывода одного студента в таблицу.

const $table = document.createElement('table'),
      $thead = document.createElement('thead'),
      $trHeadRow = document.createElement('tr'),
      $thHeadFIO = document.createElement('th'),
      $thHeadBirthDay = document.createElement('th'),
      $thHeadStudyStart = document.createElement('th'),
      $thHeadFaculity = document.createElement('th'),
      $tbody = document.createElement('tbody'),
      $container = document.getElementById('app');
$thHeadFIO.textContent = 'Ф. И. О'
$thHeadBirthDay.textContent = 'Дата рождения и возраст'
$thHeadStudyStart.textContent = 'Годы обучения'
$thHeadFaculity.textContent = 'Факультет'

$thHeadFIO.classList.add('click')
$thHeadFaculity.classList.add('click')
$thHeadBirthDay.classList.add('click')
$thHeadStudyStart.classList.add('click')
$table.classList.add('table')
$table.classList.add('table-striped')

$trHeadRow.append($thHeadFIO)
$trHeadRow.append($thHeadFaculity)
$trHeadRow.append($thHeadBirthDay)
$trHeadRow.append($thHeadStudyStart)
$thead.append($trHeadRow)
$table.append($thead)
$table.append($tbody)
$container.append($table)

function getStudentItem(studentObj) {
  const $trBodyRow = document.createElement('tr'),
        $thBodyFIO = document.createElement('td'),
        $thBodyBirthDay = document.createElement('td'),
        $thBodyStudyStart = document.createElement('td'),
        $thBodyFaculity = document.createElement('td'),
        $thBodyDelete = document.createElement('td'),
        $buttonDeleteStudent = document.createElement('button');
  $buttonDeleteStudent.classList.add('btn', 'btn-danger', 'w-100')
  studentObj.fio = studentObj.surname + ' ' + studentObj.name + ' ' + studentObj.lastname
  $thBodyFIO.textContent = studentObj.fio
  $thBodyBirthDay.textContent = studentObj.birthday
  $thBodyStudyStart.textContent = studentObj.studyStart
  $thBodyFaculity.textContent = studentObj.faculty
  $buttonDeleteStudent.textContent = 'Удалить'
  $buttonDeleteStudent.addEventListener('click', async function() {
    await deleteStudentServer(studentObj.id)
    $trBodyRow.remove()
  })

  $thBodyDelete.append($buttonDeleteStudent)
  $trBodyRow.append($thBodyFIO)
  $trBodyRow.append($thBodyFaculity)
  $trBodyRow.append($thBodyBirthDay)
  $trBodyRow.append($thBodyStudyStart)
  $trBodyRow.append($thBodyDelete)
  $tbody.append($trBodyRow)
}
//функция отрисовки всех студентов в таблицу

function renderStudentsTable(studentsArray) {
  $tbody.textContent = ''
  const $filterFIO = document.getElementById('inp-fio').value
  const $filterFaculty = document.getElementById('inp-faculty').value
  const $filterStart = document.getElementById('inp-start').value
  const $filterFinal = document.getElementById('inp-final').value
  let newArr = [...studentsArray]
  if ($filterFIO !== '') newArr = filter(studentsList, 'fio', $filterFIO)
  if ($filterFaculty !== '') newArr = filter(studentsList, 'faculty', $filterFaculty)
  for (let i = 0; i < studentsArray.length; i++) {
    if ($filterStart == studentsArray[i].studyStart.substring(0, 4)) newArr = filter(studentsList, 'studyStart', $filterStart)
    if ($filterFinal == studentsArray[i].studyStart.substring(7, 11)) newArr = filter(studentsList, 'studyStart', $filterFinal)
  }
  for (const item of newArr) {
    getStudentItem(item)
  }
}
renderStudentsTable(studentsList)

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных. Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

document.getElementById('form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const $inputName = document.getElementById('input-name'),
        $inputSurname = document.getElementById('input-surname'),
        $inputLastName = document.getElementById('input-last-name')
  const $inputBirthDay = document.getElementById('input-birth')
  const $inputStudyStart = document.getElementById('input-start')
  const $inputFaculty = document.getElementById('input-faculty')
  const student = {}
  student.name = $inputName.value
  student.surname = $inputSurname.value
  student.lastname = $inputLastName.value
  student.studyStart = $inputStudyStart.value
  student.faculty = $inputFaculty.value

  const errorMessage = document.getElementById('error-span')

  if($inputName.value.trim() === '') {
    errorMessage.textContent = "Вы не ввели имя*"
    return
  }
  if( $inputSurname.value.trim() === '') {
    errorMessage.textContent = "Вы не ввели фамилию*"
    return
  }
  if($inputLastName.value.trim() === '') {
    errorMessage.textContent = "Вы не ввели отчество*"
    return
  }
  if(!$inputBirthDay.valueAsDate) {
    errorMessage.textContent = 'Вы не указали дату рождения*'
    return
  }else {
    student.birthday = `${getDateBirth($inputBirthDay.valueAsDate)} (${agetost(calculateAge($inputBirthDay.valueAsDate))})`
  }
  if($inputStudyStart.value === '') {
    errorMessage.textContent = "Вы не ввели год начала обучения*"
    return
  }else if ($inputStudyStart.value < 2000) {
    errorMessage.textContent = 'Год начала обучения не может быть раньше 2000-го*'
    return
  }else if ($inputStudyStart.value > 2023) {
    errorMessage.textContent = 'Год начала обучения не может быть позже текущего*'
    return
  }else {
    student.studyStart = getYearStart($inputStudyStart.value)
  }

  if($inputFaculty.value.trim() === '') {
    errorMessage.textContent = "Вы не ввели факультет*"
    return
  }

  let serverData = await addStudentServer(student);
  studentsList.push(serverData)
  renderStudentsTable(studentsList)
  $inputName.value = ''
  $inputSurname.value = ''
  $inputLastName.value = ''
  $inputBirthDay.value = ''
  $inputStudyStart.value = ''
  $inputFaculty.value = ''
})
// Этап 6. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
let sortFlag,
    sortDir = true
function sortArray(arr) {
  arr.sort(function(a, b) {
    let sort = a[sortFlag] < b[sortFlag]
    if (sortDir == false) sort = a[sortFlag] > b[sortFlag]
    if (sort) return -1
  })
  renderStudentsTable(arr)
}
//Функция для сортировки даты
function sortDate(arr) {
  arr.sort(function(a, b) {
    let sort = new Date(a['birthday'].substring(0, 10)) < new Date(b['birthday'].substring(0, 10))
    if (sortDir == false) sort = new Date(a['birthday'].substring(0, 10)) > new Date(b['birthday'].substring(0, 10))
    if (sort) return -1
  })
  renderStudentsTable(arr)
}

$thHeadFIO.addEventListener('click', () => {
  sortFlag = 'fio'
  sortDir = !sortDir
  sortArray(studentsList)
});
$thHeadFaculity.addEventListener('click', () => {
  sortFlag = 'faculty'
  sortDir = !sortDir
  sortArray(studentsList)
});
$thHeadBirthDay.addEventListener('click', () => {
  sortDir = !sortDir
  sortDate(studentsList)
})
$thHeadStudyStart.addEventListener('click', () => {
  sortFlag = 'studyStart'
  sortDir = !sortDir
  sortArray(studentsList)
});

// Этап 7. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

function filter(arr, prop, value) {
  const result = [];
  for(const user of arr) {
    if (String(user[prop]).includes(value) == true) result.push(user)
  }
  return result
}

document.getElementById('form-filter').addEventListener('submit', (e) => {
  e.preventDefault()
  renderStudentsTable(studentsList)
})



