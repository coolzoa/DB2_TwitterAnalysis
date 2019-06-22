#!/usr/bin/python
import ast
import sys

def sacarHora(tweet):
	indice = 1
	maximo = 6
	hora = ""
	minuto = ""

	time = linea[indice:6]
	while (linea[indice] != ":"):
		hora += linea[indice]
		indice += 1

	hora = int(hora)
	indice += 1
	while (linea[indice] != ","):
		minuto += linea[indice]
		indice += 1

	minuto = int(minuto)
	return hora,minuto

def sacarUsuario(tweet):
	numComa = 0
	indice = 1
	texto = ""
	while (numComa != 2):
		texto = ""
		while (tweet[indice] != ","):
			texto += tweet[indice]
			indice += 1
		numComa += 1
		indice += 1
	return texto

def esHashtag(mensaje):
	if (len(mensaje) == 0):
		return False
	else:
		if mensaje[0] == "#" and "/" not in mensaje and "x" not in mensaje and mensaje.count("#") == 1:
			return True
		else:
			return False

def esPalabra(mensaje):
	paginas = ["HTTP","HTTPS","COM","NET","ORG","WWW"]
	if (len(mensaje) <= 2 or mensaje in paginas):
		return False
	abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
	resultado = True
	for i in mensaje:
		if (i not in abc):
			resultado = False
			break
	return resultado
			

def getHashtags(linea):
	temas = ["#2030NOW","#WOMEN","#COSTARICA","#PURAVIDA","#MAKEAMERICAGREATAGAIN","#TRUMPRUSSIA","#RECYCLEREUSE","#TRAFICOCR"]
	puntos = [" ",".",",",":",";","!","?","-","_","(",")","[","]","{","}"]
	preposiciones = ["A","ANTE","BAJO","CABE","CON","CONTRA","DE","DESDE","EN","ENTRE","HACIA","HASTA","PARA","POR","SEGUN","SIN","SO","SOBRE",
"TRAS","OF","IN","TO","FOR","WITH","ON","AT","FROM","BY","ABOUT","AS",
"INTO","LIKE","THROUGH","AFTER","OVER","BETWEEN","OUT","AGAINST","DURING","WITHOUT","BEFORE","UNDER","AROUND","AMONG",
"THE","BE","TO","OF","OF","AND","IN","THAT","HAVE","I","IT","NOT","WITH","HE","AS","YOU","DO"]


	principales = list()
	secundarios = list()
	palabras = list()
	numComa = 0
	indice = 1
	texto = ""
	banderaPagina = False

	linea = linea.upper()

	#llegar hasta indice donde esta el texto
	while (numComa < 2):
		while (linea[indice] != ","):
			indice += 1
		numComa += 1
		indice += 1
	#analizar hasta fin de linea
	while (linea[indice] != '\n'):

		#busco palabra hasta encontrar un tipo de punto o ] (final del linea de texto
		while (linea[indice] not in puntos and linea[indice] != "]"):
			texto += linea[indice]
			indice += 1

		#encontre una posible palabra o hashtag en uno de los puntos
		if (texto not in preposiciones):
			if (texto in temas):
				#print(texto,"Es tema")
				principales.append(texto)

			elif (esHashtag(texto)):
				#print(texto,"Es tag")
				secundarios.append(texto)
			elif (esPalabra(texto)):
				#print(texto,"Es palabra")
				palabras.append(texto)
			else:
				#print("Ignorar: ",texto)
				pass
		texto = ""
		indice += 1
		
	if (texto not in preposiciones):
		if (texto in temas):
			#print(texto,"Es tema")
			principales.append(texto)
		elif (esHashtag(texto)):
			#print(texto,"Es tag")
			secundarios.append(texto)
		elif (esPalabra(texto)):
			#print(texto,"Es palabra")
			palabras.append(texto)
		else:
			pass

	return principales,secundarios,palabras

#MAIN
for linea in sys.stdin:
	palabras = list()
	hora, minuto = sacarHora(linea)
	usuario = sacarUsuario(linea)
	hashtagsPrincipales, hashtagsSecundarios, palabras = getHashtags(linea)
	key = hora
	value =  usuario + "," + str(hashtagsPrincipales) + "," + str(hashtagsSecundarios) + "," + str(palabras)
	if (len(hashtagsPrincipales) > 0):
		print((key,value))
	
		
		
		





		
	
