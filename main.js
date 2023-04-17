// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [
  {
    name: 'Павел',
    surname: 'Быстров',
    middleName: 'Андреевич',
    birthYear: `${getDateBirth(new Date(1990, 07, 11))} (${agetost(calculateAge(new Date(1990, 07, 11)))})`,
    startOfTraining: getYearStart(2021),
    faculty: 'Гриффиндор'
  },
  {
    name: 'Петр',
    surname: 'Идряков',
    middleName: 'Михайлович',
    birthYear: `${getDateBirth(new Date('1991-05-05'))} (${agetost(calculateAge(new Date('1991-05-05')))})`,
    startOfTraining: getYearStart(2011),
    faculty: 'Когтевран'
  },
  {
    name: 'Татьяна',
    surname: 'Михайлова',
    middleName: 'Олеговна',
    birthYear: `${getDateBirth(new Date('1989-10-02'))} (${agetost(calculateAge(new Date('1989-10-02')))})`,
    startOfTraining: getYearStart(2001),
    faculty: 'Слизерин'
  },
  {
    name: 'Николай',
    surname: 'Варфлусьев',
    middleName: 'Генадьевич',
    birthYear: `${getDateBirth(new Date(1979, 02, 01))} (${agetost(calculateAge(new Date(1979, 02, 01)))})`,
    startOfTraining: getYearStart(2000),
    faculty: 'Слизерин'
  },
  {
    name: 'Антон',
    surname: 'Коршунов',
    middleName: 'Андреевич',
    birthYear: `${getDateBirth(new Date('1999-07-12'))} (${agetost(calculateAge(new Date('1999-07-12')))})`,
    startOfTraining: getYearStart(2019),
    faculty: 'Пуффендуй'
  }
]

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

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией o пользователе. У функции должен быть один аргумент - объект студента.

const $table = document.createElement('table'),
      $thead = document.createElement('thead'),
      $trHeadRow = document.createElement('tr'),
      $thHeadFIO = document.createElement('th'),
      $thHeadBirthYear = document.createElement('th'),
      $thHeadStartOfTraining = document.createElement('th'),
      $thHeadFaculity = document.createElement('th'),
      $tbody = document.createElement('tbody'),
      $container = document.getElementById('app');
$thHeadFIO.textContent = 'Ф. И. О'
$thHeadBirthYear.textContent = 'Дата рождения и возраст'
$thHeadStartOfTraining.textContent = 'Годы обучения'
$thHeadFaculity.textContent = 'Факультет'

$thHeadFIO.classList.add('click')
$thHeadFaculity.classList.add('click')
$thHeadBirthYear.classList.add('click')
$thHeadStartOfTraining.classList.add('click')
$table.classList.add('table')
$table.classList.add('table-striped')

$trHeadRow.append($thHeadFIO)
$trHeadRow.append($thHeadFaculity)
$trHeadRow.append($thHeadBirthYear)
$trHeadRow.append($thHeadStartOfTraining)
$thead.append($trHeadRow)
$table.append($thead)
$table.append($tbody)
$container.append($table)

function getStudentItem(studentObj) {
  const $trBodyRow = document.createElement('tr'),
        $thBodyFIO = document.createElement('td'),
        $thBodyBirthYear = document.createElement('td'),
        $thBodyStartOfTraining = document.createElement('td'),
        $thBodyFaculity = document.createElement('td');
  studentObj.fio = studentObj.surname + ' ' + studentObj.name + ' ' + studentObj.middleName
  $thBodyFIO.textContent = studentObj.fio
  $thBodyBirthYear.textContent = studentObj.birthYear
  $thBodyStartOfTraining.textContent = studentObj.startOfTraining
  $thBodyFaculity.textContent = studentObj.faculty

  $trBodyRow.append($thBodyFIO)
  $trBodyRow.append($thBodyFaculity)
  $trBodyRow.append($thBodyBirthYear)
  $trBodyRow.append($thBodyStartOfTraining)
  $tbody.append($trBodyRow)
}

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов. Функция должна использовать ранее созданную функцию создания одной записи для студента. Цикл поможет вам создать список студентов. Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
//Вывод в таблицу всех студентов из массива
function renderStudentsTable(studentsArray) {
  $tbody.textContent = ''
  const $filterFIO = document.getElementById('inp-fio').value,
        $filterFaculty = document.getElementById('inp-faculty').value,
        $filterStart = document.getElementById('inp-start').value,
        $filterFinal = document.getElementById('inp-final').value
  let newArr = [...studentsArray]
  if ($filterFIO !== '') newArr = filter(studentsList, 'fio', $filterFIO)
  if ($filterFaculty !== '') newArr = filter(studentsList, 'faculty', $filterFaculty)
  for (let i = 0; i < studentsArray.length; i++) {
    if ($filterStart == studentsArray[i].startOfTraining.substring(0, 4)) newArr = filter(studentsList, 'startOfTraining', $filterStart)
    if ($filterFinal == studentsArray[i].startOfTraining.substring(7, 11)) newArr = filter(studentsList, 'startOfTraining', $filterFinal)
  }
  for (const item of newArr) {
    getStudentItem(item)
  }
}
renderStudentsTable(studentsList)

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных. Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

document.getElementById('form').addEventListener('submit', e => {
  e.preventDefault();
  const $inputName = document.getElementById('input-name'),
        $inputSurname = document.getElementById('input-surname'),
        $inputMiddleName = document.getElementById('input-middle-name')
        $inputBirthYear = document.getElementById('input-birdt'),
        $inputStartOfTraining = document.getElementById('input-start'),
        $inputFaculty = document.getElementById('input-faculty')
  const student = {}
  student.name = $inputName.value
  student.surname = $inputSurname.value
  student.middleName = $inputMiddleName.value
  student.startOfTraining = $inputStartOfTraining.value
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
  if($inputMiddleName.value.trim() === '') {
    errorMessage.textContent = "Вы не ввели отчество*"
    return
  }
  if(!$inputBirthYear.valueAsDate) {
    errorMessage.textContent = 'Вы не указали дату рождения*'
    return
  }else {
    student.birthYear = `${getDateBirth($inputBirthYear.valueAsDate)} (${agetost(calculateAge($inputBirthYear.valueAsDate))})`
  }
  if($inputStartOfTraining.value === '') {
    errorMessage.textContent = "Вы не ввели год начала обучения*"
    return
  }else if ($inputStartOfTraining.value < 2000) {
    errorMessage.textContent = 'Год начала обучения не может быть раньше 2000-го*'
    return
  }else if ($inputStartOfTraining.value > 2023) {
    errorMessage.textContent = 'Год начала обучения не может быть позже текущего*'
    return
  }else {
    student.startOfTraining = getYearStart($inputStartOfTraining.value)
  }

  if($inputFaculty.value.trim() === '') {
    errorMessage.textContent = "Вы не ввели факультет*"
    return
  }
  studentsList.push(student)

  renderStudentsTable(studentsList)
  $inputName.value = ''
  $inputSurname.value = ''
  $inputMiddleName.value = ''
  $inputBirthYear.value = ''
  $inputStartOfTraining.value = ''
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
    let sort = new Date(a['birthYear'].substring(0, 10)) < new Date(b['birthYear'].substring(0, 10))
    if (sortDir == false) sort = new Date(a['birthYear'].substring(0, 10)) > new Date(b['birthYear'].substring(0, 10))
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
$thHeadBirthYear.addEventListener('click', () => {
  sortDir = !sortDir
  sortDate(studentsList)
})
$thHeadStartOfTraining.addEventListener('click', () => {
  sortFlag = 'startOfTraining'
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
  console.log(renderStudentsTable(studentsList))
})



