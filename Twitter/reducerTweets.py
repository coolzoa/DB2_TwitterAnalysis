#!/usr/bin/python
import ast
import sys
import mysql.connector

temas = ["#2030NOW","#WOMEN","#COSTARICA","#PURAVIDA","#MAKEAMERICAGREATAGAIN","#TRUMPRUSSIA","#RECYCLEREUSE","#TRAFICOCR"]
dic = dict()
dic2 = dict()

usuarios = list()

def revisar(secundarios):
	nuevo = list()
	for i in secundarios:
		try:
			i = i.encode("utf-8")
			i = i.decode("utf-8")
			nuevo.append(i)
		except UnicodeError:
			pass
	return nuevo

def getData(value):
	principales = list()
	secundarios = list()
	palabras = list()
	usuario = ""
	indice = 0
	data = ""

	#consigo el usuario
	while (value[indice] != ","):
		usuario += value[indice]
		indice += 1

	#busco lista de hashtags principales del tweet dentro de string
	while (value[indice] != "["):
		indice += 1

	while (value[indice] != "]"):
		data = data + value[indice]
		indice += 1
	data += value[indice]
	principales = list(set(ast.literal_eval(data)))
	
	
	#busco lista de hashtags secundarios del tweet dentro de string
	indice += 1
	data = ""
	while (value[indice] != "["):
		indice += 1

	while (value[indice] != "]"):
		data = data + value[indice]
		indice += 1
	data += value[indice]
	secundarios = ast.literal_eval(data)
	secundarios = revisar(secundarios)

	#busco las palabras del tweet dentro de string
	indice += 1
	data = ""
	while (value[indice] != "["):
		indice += 1
	
	while (value[indice] != "]"):
		data = data + value[indice]
		indice += 1
	data += value[indice]
	palabras = ast.literal_eval(data)
		
	return usuario,principales,secundarios,palabras


def actualizarDiccionarioPrincipal(hora,usuario,principales,secundarios,palabras):
	global dic
	global usuarios
	encontrado = False
	indice = 0
	largo = 0

	for i in principales:
	#reviso si existe en el diccionario el tema
		if i not in dic.keys():
			elemento = list()
			#usuarios
			elemento.append(0)
			
			#cantTweetss
			elemento.append(list())

			#palabras
			elemento.append(list())

			#hashtags
			elemento.append(list())
			
			dic[i] = elemento

		
		#usuarios
		nuevo = tuple((usuario,i))
		if (nuevo not in usuarios):
			dic[i][0] += 1
			usuarios.append(nuevo)
		

		#cantTweets/hora
		cantTweets = dic[i][1]
		indice = 0
		encontrado = False
		largo = len(cantTweets)
		while (indice < largo):
			if (hora == cantTweets[indice][0]):
				encontrado = True
				cantTweets[indice][1] += 1
				break
			else:
				indice += 1

		if (encontrado == False):
			nuevo = [hora,1]	
			cantTweets.append(nuevo)
			cantTweets.sort()
		dic[i][1] = cantTweets

		#palabras
		palabrasTweet = dic[i][2]
		largo = len(palabrasTweet)
		for palabra in palabras:
			indice = 0
			encontrado = False
			
			while (indice < largo):
				if (palabra == palabrasTweet[indice][1]):
					encontrado = True
					palabrasTweet[indice][0] += 1
					break
				else:
					indice += 1

			if (encontrado == False):
				nuevo = [1,palabra]
				palabrasTweet.append(nuevo)
				palabrasTweet.sort()
				palabrasTweet = palabrasTweet[::-1]
				dic[i][2] = palabrasTweet

		#principales
		for tema in principales:
			if (i != tema):
				temas = dic[i][3]
				largo = len(temas)
				indice = 0
				encontrado = False
				while (indice < largo):
					if (tema == temas[indice][1]):
						encontrado = True
						temas[indice][0] += 1
						break
					else:
						indice += 1
				if (encontrado == False):
					nuevo = [1,tema]
					temas.append(nuevo)
					temas.sort()
					temas = temas[::-1]
					dic[i][3] = temas

		#otros hashtags
		for hashtag in secundarios:
			if (len(hashtag) > 3):
				temas = dic[i][3]
				largo = len(temas)
				indice = 0
				encontrado = False
				while(indice < largo):
					if (hashtag == temas[indice][1]):
						encontrado = True
						temas[indice][0] += 1
						break
					else:
						indice += 1

				if (encontrado == False):
					nuevo = [1,hashtag]
					temas.append(nuevo)
					temas.sort()
					temas = temas[::-1]
					dic[i][3] = temas

def actualizarDiccionarioSecundario(secundarios,principales):
	global dic2
	for i in secundarios:
		if (len(principales) > 0):
			if i not in dic2.keys():
				dic2[i] = 0 
			dic2[i] += 1


###OPERACIONES EN BD
def borrarBD():
	cnx = mysql.connector.connect(user='root',password='1234',host='127.0.0.1',port='3306',database='twitter_data')

	cursor = cnx.cursor()
	query1 = "delete from palabra;"
	query2 = "delete from tema;"
	query3 = "delete from hashtags;"
	query4 = "delete from tiempo;"
	query5 = "delete from incluirTema;"
	cursor.execute(query1)
	cursor.execute(query2)
	cursor.execute(query3)
	cursor.execute(query4)
	cursor.execute(query5)

	cnx.commit()
	cursor.close()
	cnx.close()


#meter total de usuarios y tweets de un tema
def meterDatosTema(tema,valores):
	cantUsuarios = valores[0]
	totalTweets = 0
	for i in valores[1]:
		totalTweets += i[1]

	cnx = mysql.connector.connect(user='root',password='1234',host='127.0.0.1',port='3306',database='twitter_data')

	cursor = cnx.cursor()
	query = "insert into tema(idTema,cantUsuarios,cantTweets) values(%s,%s,%s)"
	args = (tema,str(cantUsuarios),str(totalTweets))
	cursor.execute(query,args)
	cnx.commit()
	cursor.close()
	cnx.close()

#meter totales de top 10 palabras por tema
def meterDatosPalabra(tema,palabras):
	cnx = mysql.connector.connect(user='root',password='1234',host='127.0.0.1',port='3306',database='twitter_data')

	cursor = cnx.cursor()
	query = "insert into palabra(palabra,tema,apariciones) values(%s,%s,%s)"
	if (len(palabras) > 10):
		palabras = palabras[0:10]
	for i in palabras:
		palabra = i[1]
		apariciones = i[0]
		args = (palabra,tema,str(apariciones))
		cursor.execute(query,args)
		cnx.commit()
	cursor.close()
	cnx.close()

#meter totales de otros hashtags
def meterDatosHashtags(tema,hashtags):
	global temas
	cnx = mysql.connector.connect(user='root',password='1234',host='127.0.0.1',port='3306',database='twitter_data')

	cursor = cnx.cursor()
	query = "insert into hashtags(hashtag,tema,apariciones) values(%s,%s,%s)"
	if (len(hashtags) > 10):
		hashtags = hashtags[0:10]
	for i in hashtags:
		hashtag = i[1]
		if (hashtag not in temas):
			apariciones = i[0]
			args = (str(hashtag),tema,str(apariciones))
			cursor.execute(query,args)
			cnx.commit()	
	cursor.close()
	cnx.close()

#meter distribucion de tiempo
def meterDatosTiempo(tema,distribucion):
	cnx = mysql.connector.connect(user='root',password='1234',host='127.0.0.1',port='3306',database='twitter_data')
	cursor = cnx.cursor()
	query = "insert into tiempo(idtema,hora,apariciones) values(%s,%s,%s)"
	for i in distribucion:
		hora = i[0]
		apariciones = i[1]
		args = (tema,str(hora),str(apariciones))
		cursor.execute(query,args)
		cnx.commit()
	cursor.close()
	cnx.close()

#meter cuantos tweets incluian un tema para todos los otros hashtags
def meterDatosIncluirPrincipales(i,valores):
	global temas
	cnx = mysql.connector.connect(user='root',password='1234',host='127.0.0.1',port='3306',database='twitter_data')
	cursor = cnx.cursor()
	query = "insert into incluirTema(idTema,temaIncluido,apariciones) values(%s,%s,%s)"
	tema = i
	hashtags = valores
	for hashtag in hashtags:
		if (hashtag[1] in temas):
			args = (tema,hashtag[1],str(hashtag[0]))
			cursor.execute(query,args)
			cnx.commit()
	cursor.close()
	cnx.close()
	
	
#MAIN	
for linea in sys.stdin:
	datos = ast.literal_eval(linea)
	hora = datos[0]
	value = datos[1]
	usuario,principales,secundarios,palabras = getData(value)

	actualizarDiccionarioPrincipal(hora,usuario,principales,secundarios,palabras)
	actualizarDiccionarioSecundario(secundarios,principales)


borrarBD()

for i in dic.keys():
	valores = dic[i]
	meterDatosTema(i,valores)
	meterDatosPalabra(i,valores[2])
	meterDatosHashtags(i,valores[3])
	meterDatosTiempo(i,valores[1])
	meterDatosIncluirPrincipales(i,valores[3])
	
	
