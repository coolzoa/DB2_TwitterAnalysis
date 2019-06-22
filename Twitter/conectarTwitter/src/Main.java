import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.Date;

import twitter4j.FilterQuery;
import twitter4j.StallWarning;
import twitter4j.Status;
import twitter4j.StatusDeletionNotice;
import twitter4j.StatusListener;
import twitter4j.TwitterException;
import twitter4j.TwitterStream;
import twitter4j.TwitterStreamFactory;
import twitter4j.conf.ConfigurationBuilder;



public class Main {
	
	private static final String filename = "datos.txt";

	public static void main(String[] args) throws TwitterException{
		
		
		
		//autenticacion usando keys de cuenta de twitter
		ConfigurationBuilder cb = new ConfigurationBuilder();
		
		cb.setOAuthConsumerKey ("lmPamXZFf9Xr3aA1Qxme9wYNG")
		.setOAuthConsumerSecret("Ngx2GcWLHJxrbeXGkJlSZFgmtwPUy7FBWweuwaaanibAxpz39Y")
		.setOAuthAccessToken("340142097-xvxbjWlMPXEkRGdutgPqkU4xIpZBS6vot8GEorG4")
		.setOAuthAccessTokenSecret("JBqI7yPFfx26oornjfODYjXP0znTlHyAu02n7poeyTmAT");
			
		//inicializacion de twitter stream
		TwitterStream twitterStream = new TwitterStreamFactory(cb.build()).getInstance();
		
		//agregar listener de stream
		twitterStream.addListener(new StatusListener() {
			//variables de archivo
			BufferedWriter bw = null;
			FileWriter fw = null;
			
			public void onStatus(Status status){
				
				//hora
				@SuppressWarnings("deprecation")
				int hora = status.getCreatedAt().getHours();
				
				@SuppressWarnings("deprecation")
				int minuto = status.getCreatedAt().getMinutes();
				
				//usuario y contenido de twitter
				String usuario = status.getUser().getScreenName();
				String contenido;
				if (status.isRetweet()){
					contenido = status.getRetweetedStatus().getText();
					
				}else{
					contenido = status.getText();
				}
				
				contenido = contenido.replaceAll("\n", " ");
				contenido = contenido.replaceAll("\t", " ");
				
				try{
					File file = new File(filename);
					if (!file.exists()){
						file.createNewFile();
					}
					
					fw = new FileWriter(file.getAbsoluteFile(),true);
					bw = new BufferedWriter(fw);
					String mensaje = "["+hora+":"+minuto+","+usuario+"," + contenido +"]\n";
					bw.write(mensaje);
					System.out.println("Tweet escrito a las " + hora + ":" + minuto);
				}catch (IOException e){
					e.printStackTrace();
				} finally {
					try{
						if (bw != null){
							bw.close();
							bw = null;
						}
						
						if (fw != null){
							fw.close();
							fw = null;
						}
					}catch (Exception e){
						e.printStackTrace();
					}
				}
			}

			@Override
			public void onException(Exception arg0) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onDeletionNotice(StatusDeletionNotice arg0) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onScrubGeo(long arg0, long arg1) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onStallWarning(StallWarning arg0) {
				// TODO Auto-generated method stub
				
			}

			@Override
			public void onTrackLimitationNotice(int arg0) {
				// TODO Auto-generated method stub
				
			}	
		});
		
		//crear el filtro
		FilterQuery tweetFilter = new FilterQuery();
		String palabras[] = {"#2030NOW","#women","#costarica","#puravida","#MakeAmericaGreatAgain","#Trumprussia","#RecycleReuse","#TraficoCR"};
		tweetFilter.track(palabras);
		twitterStream.filter(tweetFilter);
	}
}
