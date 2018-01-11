let customerId = 0
let mealId = 0
let deliveryId = 0
let employerId = 0
let store = {
  customers:[], meals:[], deliveries:[], employers:[]
}


class Customer {
  constructor(name, employer) {
    this.name = name
    if (employer) {
      this.employer = employer
      this.employerId = employer.id
      employer.employeeList.push(this)
    }
    this.id = ++customerId
    store.customers.push(this)
    this.mealList = []
    this.delList = []
  }
  meals() {
    return this.mealList
  }
  deliveries() {
    return this.delList
  }

  totalSpent() {
    let total = 0
    this.mealList.forEach(function(beef){total += beef.price})
    return total
  }
}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
    this.delList = []
    this.custList = []
  }
  static byPrice() {
    return store.meals.sort(function (a,b) {
        return b.price - a.price
    })
  }
  deliveries() {
    return this.delList
  }
  customers() {
    return this.custList
  }
}


class Delivery {
  constructor(meal, customer) {
    if (meal) {
      this.mealx = meal
      this.mealId = meal.id
    }
    if (customer) {
      this.customerx = customer
      this.customerId = customer.id
      if (customer.employer){
        customer.employer.delivList.push(this)
      }
    }
    if (meal && customer) {
      customer.mealList.push(meal)
      customer.delList.push(this)
      meal.custList.push(customer)
      meal.delList.push(this)
      if (customer.employer){
        customer.employer.mealList.push(meal)
      }
    }
    this.id = ++deliveryId
    store.deliveries.push(this)
  }
  meal() {
    return this.mealx
  }
  customer() {
    return this.customerx
  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
    this.employeeList = []
    this.delivList = []
    this.mealList = []
  }

  employees() {
    return this.employeeList
  }

  deliveries() {
    return this.delivList
  }

  meals() {
    return [...new Set(this.mealList)]
  }

  mealTotals() {
    //create object, keys = meal.id's, values = price * # of occurences
    const counts = {}
    for (let i = 0; i < this.mealList.length; i++) {
      let meal = this.mealList[i]

      if (counts.hasOwnProperty(meal.id)) {counts[meal.id]++}
      else {counts[meal.id] = 1}
    }
    return counts
  }

}
