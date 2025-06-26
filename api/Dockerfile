# Use Maven with OpenJDK 17 for build stage
FROM maven:3.9.4-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy pom.xml and download dependencies (for better caching)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src src
RUN mvn clean package -DskipTests

# Production stage - use JRE instead of JDK for smaller image
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy jar from builder stage
COPY --from=builder /app/target/api-0.0.1-SNAPSHOT.jar app.jar

# Run the application
CMD ["java", "-jar", "app.jar"]
