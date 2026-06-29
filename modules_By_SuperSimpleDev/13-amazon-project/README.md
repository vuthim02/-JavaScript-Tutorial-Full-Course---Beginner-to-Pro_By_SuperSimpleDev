# Module 13: Amazon Project and Introduction to Git

**Duration:** ~89 minutes  
**Video Timestamp:** 10:58:57 - 12:28:00

## Project Overview

In this module, you'll build an Amazon-style e-commerce application. This project integrates all the concepts learned so far.

## Project Structure

```
amazon-project/
├── index.html
├── checkout.html
├── orders.html
├── tracking.html
├── css/
│   └── styles.css
├── data/
│   └── products.js
└── scripts/
    ├── main.js
    ├── checkout.js
    └── orders.js
```

## Project Features

### 1. Product Display
- Grid layout of products
- Product images, names, prices
- Add to cart functionality

### 2. Shopping Cart
- Add/remove items
- Update quantities
- Calculate totals
- Persistent storage (localStorage)

### 3. Checkout Process
- Order summary
- Delivery information
- Payment simulation

### 4. Order Tracking
- Order history
- Order status updates
- Delivery tracking

## Product Data Structure

```javascript
// data/products.js
export const products = [
  {
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    priceCents: 1090,
    rating: {
      stars: 4.5,
      count: 89
    },
    quantity: 1
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-726449cb0c4d',
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    priceCents: 2095,
    rating: {
      stars: 4.0,
      count: 127
    },
    quantity: 1
  }
];
```

## Cart Management Module

```javascript
// scripts/cart.js
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  
  let matchingItem = cart.find(item => item.id === productId);
  
  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  saveCart();
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

export function updateQuantity(productId, quantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      saveCart();
    }
  }
}

export function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}
```

## Rendering Products

```javascript
// scripts/main.js
import { products } from '../data/products.js';
import { addToCart } from './cart.js';

function renderProducts() {
  const productsGrid = document.querySelector('.products-grid');
  
  productsGrid.innerHTML = products.map(product => `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
      <div class="product-rating">
        <img src="images/ratings/rating-${product.rating.stars * 10}.png">
        <span class="product-count">${product.rating.count} reviews</span>
      </div>
      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>
      <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `).join('');
  
  // Add event listeners
  document.querySelectorAll('.add-to-cart-button').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });
}
```

## Introduction to Git

### What is Git?

Git is a version control system that tracks changes in your code. It helps you:
- Save versions of your code
- Collaborate with others
- Revert to previous versions
- Track who made what changes

### Installing Git

**Windows:**
```bash
# Download from https://git-scm.com/download/win
# Or use winget:
winget install Git.Git
```

**Mac:**
```bash
# Using Homebrew:
brew install git

# Or install Xcode Command Line Tools:
xcode-select --install
```

**Linux:**
```bash
# Ubuntu/Debian:
sudo apt update
sudo apt install git
```

### Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

## Git Basic Commands

### Initialize a Repository

```bash
# Navigate to your project
cd amazon-project

# Initialize Git
git init
```

### Basic Workflow

```bash
# Check status
git status

# Stage files (add to tracking)
git add index.html
git add css/styles.css
git add scripts/

# Stage all files
git add .

# Commit changes
git commit -m "Initial commit - Amazon project structure"

# Check changes
git diff
git diff --staged  # Show staged changes
```

### Common Commands

```bash
# View commit history
git log
git log --oneline

# Create new branch
git branch feature/add-cart

# Switch to branch
git checkout feature/add-cart
# Or in modern Git:
git switch feature/add-cart

# Merge branch
git checkout main
git merge feature/add-cart

# Delete branch
git branch -d feature/add-cart
```

### Branching Strategy

```
main (production)
  └── develop
        ├── feature/add-cart
        ├── feature/checkout
        └── feature/orders
```

## GitHub Integration

### Create Repository on GitHub

1. Go to github.com
2. Click "New repository"
3. Name your repository
4. Don't initialize with README (we already have code)

### Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/username/repo-name.git

# Push to remote
git push -u origin main

# After first push, you can just:
git push
```

### Clone a Repository

```bash
# Clone to your machine
git clone https://github.com/username/repo-name.git

# Clone specific branch
git clone -b branch-name https://github.com/username/repo-name.git
```

## Project Setup Instructions

### Step 1: Create Project Structure

```bash
mkdir amazon-project
cd amazon-project
mkdir css data scripts images products ratings
```

### Step 2: Initialize Git

```bash
git init
git status
```

### Step 3: Create Initial Files

Create the HTML, CSS, and JavaScript files as outlined above.

### Step 4: Create Initial Commit

```bash
git add .
git commit -m "Initial project setup"
```

### Step 5: Create Feature Branch

```bash
git checkout -b feature/product-page
```

### Step 6: Make Changes and Commit

```bash
git add .
git commit -m "Add product page functionality"
```

### Step 7: Merge to Main

```bash
git checkout main
git merge feature/product-page
```

## Practice Exercises

### Exercise 13.1: Git Setup
Set up Git for the Amazon project.

```bash
# 1. Initialize repository
git init

# 2. Configure Git
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 3. Create .gitignore
echo "node_modules/" > .gitignore
echo ".DS_Store" >> .gitignore

# 4. Make initial commit
git add .
git commit -m "Initial commit"
```

### Exercise 13.2: Branching
Practice creating and merging branches.

```bash
# Create feature branch
git checkout -b feature/cart-functionality

# Add cart code and commit
git add scripts/cart.js
git commit -m "Add cart functionality"

# Switch to main
git checkout main

# Merge feature
git merge feature/cart-functionality

# Delete branch
git branch -d feature/cart-functionality
```

## Summary

- The Amazon project combines all JavaScript concepts learned
- Git is essential for version control and collaboration
- Initialize repos with `git init`
- Stage files with `git add`, commit with `git commit`
- Use branches for features, merge when complete
- Push to GitHub for backup and collaboration

## Next Steps

Proceed to Module 14: Modules to learn about organizing code into separate files.

## || GO to Contents

[Go to Contents](../../ALL-LESSONS.md)