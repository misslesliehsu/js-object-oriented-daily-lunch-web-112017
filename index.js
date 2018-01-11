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
  }

}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }
}


class Delivery {
  constructor(meal, customer) {
    if (meal) {
      this.meal = meal
      this.mealId = meal.id
    }
    if (customer) {
      this.customer = customer
      this.customerId = customer.id
    }
    this.id = ++deliveryId
    store.deliveries.push(this)

  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = ++employerId
    store.employers.push(this)
  }

}
