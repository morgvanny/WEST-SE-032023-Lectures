# 1. ✅ Demonstrate First Class Functions
# Create functions to be used as callbacks
# Create a higher-order function that will take a callback as an argument
def feed(pet):
    return f'{pet} has been fed.'


def walk(pet):
    return f'{pet} has been walked.'


def taskForJoe(func):
    return func("Joe")


# print(taskForJoe(feed))
# print(taskForJoe(walk))

# 2. ✅ Create a higher-order function that returns a function


def task():
    def play(pet):
        return f'{pet} is playing.'

    return play


play_func = task()


# print(play_func('Joe'))

# 3. ✅ Demonstrate a decorator
# Create a function that takes a function as an argument, has an inner function, and returns the inner function
# Demo examples of the decorator with and without pie syntax '@'

# Without pie syntax


def coupon_calculator(price_changer):
    def print_price():
        print("Base price: $25.00")
        new_price = price_changer(25.0)
        print(f'Price after coupon: ${new_price}')
    return print_price


# def half_off(price):
#     return '{:.2f}'.format(price/2)


# half_off = coupon_calculator(half_off)

# half_off()


# With pie syntax

@coupon_calculator
def ten_off(price):
    return '{:.2f}'.format(price-10)


ten_off()


@coupon_calculator
def half_off(price):
    return '{:.2f}'.format(price/2)


half_off()
