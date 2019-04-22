const Mock = require('mockjs');
const Random = Mock.Random;

// 登录
const loginUser = (opt) => {
    const options = JSON.parse(opt.body)
    let user = {}
    if (options.user_num == 'sysadmin') {
        let newUserObject = {
            username: 'sysadmin',
            role: '20',
            code: 0,
        }
        user = newUserObject
    } else if (options.user_num == 'bookadmin') {
        let newUserObject = {
            username: 'bookadmin',
            role: '10',
            code: 0,
        }
        user = newUserObject
    } else {
        let newUserObject = {
            code: -1,
        }
        user = newUserObject
    }
    return user;
}

// 退出
const logout = () => {
    let user = {}
    return user
}


const userManage = () => {
    let users = []
        // let randomArray = [0, 5, 10, 20]
    let randomArray = ['系统管理员', '图书管理员', '老师', '学生', '其他']

    for (let i = 0; i < 5; i++) {
        let newUser = {
            date: Random.date(),
            name: Random.cname(),
            role: Random.pick(randomArray),
            id: Random.string(7),
        }
        users.push(newUser)
    }
    return users;
}

const allManager = () => {
    const manageCategory = [{
        value: '100',
        label: '全部',
        id: Random.string(5),
    }, {
        value: '20',
        label: '系统管理员',
        id: Random.string(5),
    }, {
        value: '10',
        label: '图书管理员',
        id: Random.string(5),
    }, {
        value: '-1',
        label: '普通用户',
        id: Random.string(5),
    }]

    return manageCategory;
}

const changeRole = (opt) => {
    /**
     * 请求参数
     * {id: "dXW&DH0", role: "0"}
     * 
     * role
     * 
     * 20 -> 系统管理员
     * 10 -> 图书管理员
     * 5 -> 老师
     * 0 -> 学生
     * -1 -> 其他
     * 
     */
    const options = JSON.parse(opt.body)
    let randomArray = [0, 1]

    // code = 0 为成功
    const result = {
        // code: Random.pick(randomArray),
        code: 0,
        msg: 'change success'
    }

    return result;
}

const searchUser = (opt) => {
    const options = JSON.parse(opt.body)
    console.log(options)

    let users = []
    let randomArray = ['系统管理员', '图书管理员', '老师', '学生', '其他']
    for (let i = 0; i < 5; i++) {
        let newUser = {
            date: Random.date(),
            name: Random.cname(),
            role: Random.pick(randomArray),
            id: Random.string(7),
        }
        users.push(newUser)
    }
    return users;
}
const delUser = (opt) => {
    /**
     * 传入参数
     * {id: ")EuI0eb"}
     */
    const options = JSON.parse(opt.body)
    console.log(options)
}
const addUserCate = (opt) => {
    const options = JSON.parse(opt.body)
    console.log(options)
}

const getUserInfo = () => {
    let user = [{
        name: '用户',
        major_class: '软件15003',
        image: './../../static/logo.png',
        integral: '5',
        time: '123123',
    }]
    return user
}

const updateUserInfo = (opt) => {
    const options = JSON.parse(opt.body)
    console.log(options)
    const msg = {
        msg: 'success'
    }
    return msg
}


// Mock.mock('/user/login', 'post', loginUser);
// Mock.mock('/user/logout', 'post', logout);
// Mock.mock('/user/category', 'get', allManager);
// Mock.mock('/user', 'get', userManage);
// Mock.mock('/user/:userid', 'put', changeRole);
// Mock.mock('/user/:userid', 'del', delUser);
// Mock.mock('/user/search', 'post', searchUser);

// Mock.mock('/user/category/add', 'post', addUserCate)

// Mock.mock('/user/info/:userid', 'get', getUserInfo)
// Mock.mock('/user/info', 'get', getUserInfo)

// Mock.mock('/user/update/:userid', 'put', updateUserInfo)
// Mock.mock('/user/update', 'put', updateUserInfo)

// **********************************************************
//  图书

const searchBook = (opt) => {
    /**
     * 请求参数
     * {name: "a", value: "1"}
     */
    const options = JSON.parse(opt.body)
    console.log(options)

    let books = []
        // let randomArray = [1, 2, 3, 4, 5]
    let randomArray = ['计算机', '语言', '艺术', '视觉', '设计']
    let newBook = {
        date: Random.date(),
        name: Random.cname(),
        cate: Random.pick(randomArray),
        id: Random.number(7),
    }
    books.push(newBook)
    return books;
}

const allBookCate = () => {
    const bookCategory = [{
        direction: '网络文学',
        category: [{
            name: '全部'
        }, {
            name: '男频'
        }, {
            name: '女频'
        }, {
            name: '玄幻奇幻'
        }, {
            name: '现代都市'
        }, {
            name: '武侠仙侠'
        }, {
            name: '现代言情'
        }, {
            name: '穿越重生'
        }, {
            name: '古装言情'
        }],
    }, {
        direction: '教育',
        category: [{
            name: '全部'
        }, {
            name: '中小学教辅'
        }, {
            name: '考试'
        }, {
            name: '外语工具书'
        }, {
            name: '教师用书'
        }, {
            name: '英语四六级'
        }, {
            name: '考研'
        }, {
            name: '公务员'
        }],
    }]

    return bookCategory;
}

const bookManage = () => {
    let books = []
        // let randomArray = [1, 2, 3, 4, 5]
    let randomArray = ['计算机', '语言', '艺术', '视觉', '设计']
    for (let i = 0; i < 5; i++) {
        let newBook = {
            date: Random.date(),
            name: Random.cname(),
            cate: Random.pick(randomArray),
            id: Random.integer(5),
        }
        books.push(newBook)
    }
    return books;
}

const changeCate = (opt) => {
    const options = JSON.parse(opt.body)
        /**
         * 请求参数
         * {id: "dXW&DH0", category: "1"}
         * 
         * category
         * 
         * 1 -> 计算机
         * 2 -> 语言
         * 3 -> 艺术
         * 4 -> 视觉
         * 5 -> 设计
         * 
         */
    console.log(options)
        // let randomArray = [0, 1]

    // code = 0 为成功
    const result = {
        // code: Random.pick(randomArray),
        code: 0,
        msg: 'change success'
    }

    return result;
}

const delBook = (opt) => {
    /**
     * 传入参数
     * {id: ")EuI0eb"}
     */
    const options = JSON.parse(opt.body)
    console.log(options)
}

const addBookCate = (opt) => {
    const options = JSON.parse(opt.body)
    console.log(options)
}

const getBookInfo = ({ _req }) => {
    let books = [{
        name: '产品',
        author: 'TT',
        image: './../../static/logo.png',
        content: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        category: '心理',
        press: '清华大学出版社',
        numeration: 'ISO-900234124241342342',
        count: '5'
    }]
    return books
}

const updateBookInfo = (opt) => {
    const options = JSON.parse(opt.body)
    console.log(options)
    const msg = {
        msg: 'success'
    }
    return msg
}



// Mock.mock('/book/search', 'post', searchBook);
// Mock.mock('/book/category', 'get', allBookCate);

// // *******
// // 添加分类
// Mock.mock('/book/category', 'post', allBookCate);
// Mock.mock('/book', 'post', allBookCate);
// // *******
// Mock.mock('/book', 'get', bookManage);
// Mock.mock('/book/:bookid', 'put', changeCate);
// Mock.mock('/book/:bookid', 'del', delBook);

// Mock.mock('/book/category/add', 'post', addBookCate)

// // Mock.mock('/book/info/:bookid', 'get', getBookInfo)
// Mock.mock('/book/info', 'get', getBookInfo)

// // Mock.mock('/book/update/:bookid', 'put', updateBookInfo)
// Mock.mock('/book/update', 'put', updateBookInfo)



// ********************************8
// 分组管理

const searchUserCate = (opt) => {
    const options = JSON.parse(opt.body)
    let randomArray = ['系统管理员', '图书管理员', '老师', '学生', '其他']

    const result = {
        id: Random.string(7),
        label: Random.pick(randomArray),
    }

    return result;
}

const searchBookCate = (opt) => {
    const options = JSON.parse(opt.body)
    let randomArray = ['计算机', '语言', '艺术', '视觉', '设计']

    const result = {
        id: Random.string(7),
        label: Random.pick(randomArray),
    }

    return result;
}

// Mock.mock('/user/category/search', 'post', searchUserCate)
// Mock.mock('/book/category/search', 'post', searchBookCate)