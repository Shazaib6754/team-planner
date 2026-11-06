# Fase 3 – Weekplanning

## 1. Doel van deze fase

Het doel van fase 3 was om de Team Planner uit te breiden met een werkende weekplanning. Een teamleider kan medewerkers aan taken koppelen op verschillende werkdagen.

Ook heb ik ervoor gezorgd dat de planning per week wordt bijgehouden en dat er regels zijn om ongeldige planningen te voorkomen.

## 2. Aanpak

Ik ben begonnen met het toevoegen van de benodigde gegevens aan de TypeScript-types. Een geplande taak bevat een medewerker, een taak, een werkdag en de startdatum van de week.

Daarna heb ik formulieren en componenten gemaakt waarmee een medewerker aan een taak kan worden toegewezen. Een geplande taak kan ook weer worden verwijderd.

Ik heb weeknavigatie toegevoegd, zodat de gebruiker naar de vorige en volgende week kan gaan. Planningen van verschillende weken blijven van elkaar gescheiden.

## 3. Componentenstructuur

De belangrijkste onderdelen zijn:

- `App.tsx`: verbindt de verschillende onderdelen van de applicatie.
- `useTeamPlanner.ts`: beheert de state en de functies voor medewerkers, taken en planningen.
- `ScheduleForm.tsx`: formulier voor het maken van een planning.
- `ScheduleFormFields.tsx`: bevat de invoervelden van het planningsformulier.
- `WeekView.tsx`: toont de planning van de geselecteerde week.
- `WeekDayColumn.tsx`: toont de geplande taken per werkdag.
- `scheduleRules.ts`: bevat de controles voor de planningsregels.
- `weekUtils.ts`: bevat functies voor het berekenen en aanpassen van weken.

## 4. Gemaakte keuzes

Ik heb ervoor gekozen om de state centraal te beheren in de custom hook `useTeamPlanner.ts`. Hierdoor staan de gegevens en functies op één plek. De componenten ontvangen de benodigde gegevens en functies via props.

De planningsregels staan in aparte TypeScript-functies in `scheduleRules.ts`. Hierdoor zijn deze controles gescheiden van de weergave.

Ik heb gekozen voor een formulier met keuzelijsten in plaats van drag-and-drop. Dit is eenvoudiger te bouwen en maakt het duidelijk welke medewerker, taak en werkdag worden gekozen.

## 5. Problemen en oplossingen

Een belangrijk onderdeel was het voorkomen van ongeldige planningen.

Een medewerker mag op dezelfde dag niet meerdere taken krijgen. Ook mag een taak niet meer medewerkers krijgen dan het ingestelde maximum.

Daarnaast heb ik ervoor gezorgd dat het verwijderen van een medewerker of taak ook de bijbehorende planningen verwijdert.

Bij het bewerken van een taak wordt gecontroleerd of het nieuwe maximum nog past bij de bestaande planningen. Als dat niet zo is, wordt de wijziging geweigerd.

Ik heb de applicatie getest door verschillende planningen toe te voegen, medewerkers en taken te verwijderen en de capaciteit van taken aan te passen.

## 6. Gebruik van AI

Ik heb AI gebruikt als hulpmiddel bij het schrijven, controleren en verbeteren van de code.

Ook heb ik AI gebruikt om uitleg te krijgen over React-state, custom hooks, TypeScript en het controleren van planningsregels.

Ik heb de voorgestelde wijzigingen stap voor stap toegepast en de applicatie zelf getest. Ik heb ook gecontroleerd of de build en lint zonder fouten werden uitgevoerd.

## 7. Wat zou ik anders doen?

Bij een volgend project zou ik eerder nadenken over hoe ik de state en de verschillende functies verdeel over bestanden.

Ook zou ik vanaf het begin meer aandacht besteden aan het testen van situaties waarin meerdere acties achter elkaar worden uitgevoerd.

## 8. Wat heb ik geleerd?

Ik heb geleerd hoe ik een weekplanning kan bouwen met React en TypeScript.

Ook heb ik geleerd hoe een custom hook gebruikt kan worden om state en functies centraal te beheren.

Daarnaast begrijp ik beter hoe je regels buiten componenten kunt plaatsen en hoe je voorkomt dat gebruikers ongeldige gegevens kunnen opslaan.