FROM adoptopenjdk:11-jdk-hotspot as builder
WORKDIR app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw \ 
  && ./mvnw dependency:go-offline
COPY src ./src  
RUN ./mvnw package assembly:single

FROM adoptopenjdk:11-jre-hotspot
WORKDIR app
COPY --from=builder app/target/lwapp-springws-client-1.0.0-SNAPSHOT-jar-with-dependencies.jar ./app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]