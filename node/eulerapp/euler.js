exports.solution = function(problem) {
	var s = null;

	switch(problem)
	{
		case 1:
			s = multiplesOf3And5Sum(999);
			break;
		case 2:
			s = evenFibonacciNumberSum(1, 2, 4000000);
			break;
		case 3:
			s = largestPrimeFactor(1, 600851475143);
			break;
		case 4:
			s = largestPalidromeProduct(100, 999);
			break;
		case 5:
			s = smallestMultiple(20);
			break;
		case 6:
			s = sumSquareDifference(100);
			break;
		case 7:
			s = findXthPrime(10001);
			break;
		case 8:
			s = largestProductInASeries(5, '7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450');
			break;
		case 9:
			s = specialPythagoreanTriplet(1000);
			break;
		case 10:
			s = summationOfPrimes(2000000);
			break;
		default:
			solution = null;
			break;
	}

	return s;
};


function isPrime(x)
{
	if (x < 2)
		return false;

	var prime = true;
	if (x > 2)
		if (x % 2 === 0)
			prime = false;
		else
			for (var i = 3; i < x; i += 2)
				if (x % i === 0)
				{
					prime = false;
					break;
				}

	return prime;
}


function evenFibonacciNumbersSum(last, x, max)
{
	if (x > max && last % 2 === 0)
		return last;
	else if (x > max)
		return 0;
	else if (last % 2 === 0)
		return (last + evenFibonacciNumbersSum(x, last + x, max));
	else
		return evenFibonacciNumbersSum(x, last + x, max);
}


function findXthPrime(x)
{
	if (x < 1)
		return 0;

	var count = 0;
	var i = 1;
	while (count < x)
	{
		i++;
		if (isPrime(i))
			count++;
	}

	return i;
}


function largestPalidromeProduct(min, max)
{
	if ((min < 1) || (max < 1) || (min > max))
		return 0;

	var largest = 0;

	for (var x = min; x <= max; x++)
	{
		for (var y = x; y <= max; y++)
		{
			var z = x * y;
			var isPalindrome = false;

			if (z < 10)
				isPalindrome = true;
			else
			{
				var zz = z;
				var zrev = 0;

				while (zz > 10)
				{
					zrev = (zrev * 10);
				
					if (zz > 0)
						zrev = zrev + (zz % 10);

					zz = Math.floor(zz / 10);
				}
				zrev = (zrev * 10) + zz;

				if (zrev === z)
					isPalindrome = true;
				else
					isPalindrome = false;
			}

			if ((isPalindrome === true) && (z > largest))
				largest = z;
		}
	}

	return largest;
}



function largestPrimeFactor(x, target)
{
	var prime = isPrime(x);

	if (x < 2)
		return largestPrimeFactor(2, target);
	else if (x > target)
		return 0;
	else if ((prime === true) && (x === target))
		return x;
	else if ((prime === true) && (target % x === 0))
		return largestPrimeFactor((x + 1), (target / x));
	else
		return largestPrimeFactor((x + 1), target);
}


function largestProductInASeries(digits, series)
{
	if (digits < 1)
		return 0;

	if (series.length < digits)
		return 0;

	var largest = 0;
	for(var i = (series.length - 1); i >= (digits - 1); i--)
	{
		var product = 1;
		for (var j = i; j > (i - digits); j--)
		{
			product *= Math.floor(series[j]);
		}

		if (product > largest)
			largest = product;
	}

	return largest;
}


function multiplesOf3And5(x)
{
	if (x === 0)
		return 0;
	else if (x % 3 === 0 || x % 5 === 0)
		return (x + multiplesOf3And5Sum(x - 1));
	else
		return (multiplesOf3And5Sum(x - 1));
}


function smallestMultiple(x)
{
	if (x < 1)
		return 0;

	var lowerLimit = x;
	for (var y = 1; y <= x; y++)
	{
		var prime = isPrime(y);
		if (prime === true)
			lowerLimit *= y;
	}

	var upperLimit = 1;
	for (var z = 1; z <= x; z++)
		upperLimit *= z;

	var smallest = 0;
	for (var j = lowerLimit; j <= upperLimit; j++)
	{
		var isMultiple = true;
		for (var k = x; k > 1; k--)
			if (j % k !== 0)
			{
				isMultiple = false;
				break;
			}

		if (isMultiple === true)
		{
			smallest = j;
			break;
		}
	}

	return smallest;
}


function specialPythagoreanTriplet(sum)
{
	if (sum < 3)
		return 0;

	for (var a = 1; a <= (sum - 2); a++)
		for (var b = (a + 1); b <= (sum - 1); b++)
			for (var c = (b + 1); c <= sum; c++)
				if ((Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2)) && (a + b + c === 1000))
					return (a * b * c);
}


function summationOfPrimes(x)
{
	if (x < 2)
		return 0;

	var primes = new Array();
	primes[0] = 2;

	var sum = 2;
	for (var i = 3; i <= x; i += 2)
	{
		for (var j = 0; j < primes.length; j++)
		{
			var prime = true;
			if (i % primes[j] === 0)
			{
				prime = false;
				break;
			}
		}
		
		if (prime === true)
		{
			primes[primes.length] = i;
			sum += i;
		}
	}

	return sum;
}


function sumSquareDifference(x)
{
	if (x < 1)
		return 0;

	var sumOfSquares = 0;
	var squareOfSum = 0;
	var sum = 0;

	for(var i = 1; i <= x; i++)
	{
		sum += i;
		sumOfSquares += (i * i);
	}

	squareOfSum = (sum * sum);

	return (squareOfSum - sumOfSquares);
}

