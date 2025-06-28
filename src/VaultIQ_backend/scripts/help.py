#get the divisors of a number
def divisors(numbers):
    divisors = []
    for i in range(1, numbers + 1):
        if numbers % i == 0:
            divisors.append(i)
    return divisors
print(divisors(10))

#load a file and remove the duplicates

with open('test.txt', 'r') as file:
    lines = file.readlines()
    
numbers = []
for line in lines:
    line = line.strip()
    if line.isdigit():
        numbers.append(line)
unique_numbers = list(set(numbers))
unique_numbers.sort()
with open('output.txt', 'w') as file:
    for number in unique_numbers:
        file.write(str(number) + '\n ')
print('output.txt')