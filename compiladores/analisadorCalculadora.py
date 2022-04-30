# Analisador Léxico Calculadora

# 1 - FLOAT -> ([0-9]+\.[0-9]+) 
# 2 - INT -> ([0-9]+)
# 3 - PLUS -> (\+)
# 4 - LEFT PARENTHESE -> (\))
# 5 - RIGHT PARENTHESE -> (\()
# 6 - MULTIPLICATION -> (\*)
# 7 - SUBTRACTION -> (\-)
# 8 - DIVISION -> (\/)

import re
types = ['FLOAT', 'INT', 'PLUS','LEFT PARENTHESE', 'RIGHT PARENTHESE', 'MULTIPLICATION', 'SUBTRACTION', 'DIVISION']
expressao = input("Realize sua operação matemática: ")
matches = []

def analisaExpressao(expressao):
  matchTuple = re.findall(r'([0-9]+\.[0-9]+)|([0-9]+)|(\+)|(\()|(\))|(\*)|(\-)|(\/)', expressao)
  
  for match in matchTuple:
      matchList = list(match);

      for idx, match  in enumerate(matchList):
          if (match != ''):
              matches.append([match, types[idx]])
  return matches

analisaExpressao(expressao)