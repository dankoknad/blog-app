import Remarkable from 'remarkable';
const baseUrl = 'http://localhost:4020/employees';


// load data
export const loadBlogPosts = (url) => {
  return fetch(url)
    .then(res => res.json())
}

// save data addEmployee
export const addEmployee = (employee) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  }).then(res => res.json())
}

// update data updateEmployee 
export const updateEmployee = (employee) => {
  return fetch(`${baseUrl}/${employee.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  }).then(res => res.json())
}

// update data removeEmployee
export const removeEmployee = (id) => {
  return fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

// render markdown
export const renderMarkdown = (txt) => {
	const md = new Remarkable({breaks: true});
	return { __html: md.render(txt) };
}

// generate timestamp
export const getTimeStamp = () => {
	return  new Date();
}

// timestamp to readable
export const getDateFromTimestamp = (timeStamp) => new Date(+ timeStamp).toUTCString();