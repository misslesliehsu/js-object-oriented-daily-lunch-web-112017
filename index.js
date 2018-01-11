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
    return store.meals.filter(meal => {
      return meal.customerId === this.id
    })
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
    }
    if (meal && customer) {
      customer.mealList.push(meal)
      customer.delList.push(this)
      meal.custList.push(customer)
      meal.delList.push(this)
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
  }

}
