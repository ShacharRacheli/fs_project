# בסיס התמונה של .NET 8
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /source

# העתקת קבצים לתוך הקונטיינר
COPY ./Comp.API.csproj ./Comp.API.csproj
COPY ./Program.cs ./Program.cs
# אם יש קבצים נוספים, הוסף אותם כאן

# התקנת תלויות
RUN dotnet restore "Comp.API.csproj"

# שלב הבנייה
RUN dotnet publish "Comp.API.csproj" -c Release -o /app --self-contained false

# שלב ההרצה
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

COPY --from=build /app .

# יצירת משתמש לא-שורש
RUN adduser -D appuser
USER appuser

# חשיפת הפורט והגדרת ASPNETCORE_URLS ל-HTTP על פורט 80
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

# קביעת הפקודה להרצה
ENTRYPOINT ["dotnet", "Comp.API.dll"]
