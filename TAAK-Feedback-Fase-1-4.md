# Feedback op fase 1 t/m 4

## Doel

Je app werkt tot en met fase 4, je planningsregels houden stand en je Git historie is leesbaar. Het grootste gat zit in je fase documenten: ze beschrijven wat je bouwde, maar niet waarom, wat er misging en wat je precies met AI deed(wat ik je gisteren verteld heb). Die documenten tellen net zo zwaar als de code.

Daarnaast is de inlevering nog niet compleet: twee tags ontbreken, de repository is openbaar en geen enkele Pull Request is beoordeeld. Er zitten vijf bugs in de app en fase 5 moet nog natuurlijk worden gebouwd.

Werk de stappen van boven naar beneden af en vink af wat klaar is.

Bij de meeste punten staat wat er mis is en waar je kunt lezen hoe het werkt, maar niet de oplossing. Die bedenk je zelf en leg je uit in je fase document(AI vragen welke opties heb je beschikbaar en wat kan je doen is ook een optie maar als je zomaar iets doet zonder te denken en op alle prompts van AI ja klikt leer je niks). Alleen in stap 1 staan exacte Git commando's, omdat een fout daar lastig terug te draaien is.

## Waar je nu staat

| Fase         | Stand                               | Nog te doen                           |
| ------------ | ----------------------------------- | ------------------------------------- |
| 1. Fundament | Code werkt                          | Tag, componentenboom, bug 4, document |
| 2. Beheren   | Code werkt                          | Bug 2, document                       |
| 3. Plannen   | Regels houden stand                 | Tag, bug 3 en 5, stap 3, document     |
| 4. Inzicht   | Werkt, twee eisen nog niet helemaal | Bug 1, stap 4, document               |
| 5. Afronden  | Niet begonnen                       | Alles                                 |

## Wat goed gaat

Houd dit vast:

- **Je planningsregels houden stand.** Dubbel inplannen op een dag, een volle taak, dubbelklikken op Inplannen, weken die elkaar niet beïnvloeden en opruimen na verwijderen gaan allemaal goed. Er kon geen ongeldige planning gemaakt worden.
- **Een lager maximum mag een bestaande planning niet ongeldig maken,** en dat vang je af in `handleEditTask`. Dat stond niet in de opdracht.
- **De app opent op de huidige week.** De weekberekening klopt ook op zondag, rond de wisseling van zomer- en wintertijd en over de jaarwisseling.
- **Je Git historie is leesbaar.** 32 van de 33 commits compileren en linten, je berichten zeggen wat er veranderde, en elke fase heeft een eigen branch en Pull Request.
- **Je types zijn duidelijk.** `strict` staat expliciet aan, er is geen `any` en er is maar één `as`-cast.
- **Je state staat op logische plekken.** Overzichtsgetallen bereken je tijdens het renderen, en de zoektekst en het rolfilter staan in `EmployeeList` en niet in je hook.
- **Je componenten zijn klein** (het grootste is 152 regels). `tsc`, build en lint slagen, de console blijft schoon, elke lijst heeft al een lege staat en op 375 px is er geen horizontaal scrollen.

## Stap 1: maak de inlevering compleet

### Zet de repository op privé

De opdracht vraagt een private repository. Die jouwe is openbaar.

- [ ] De repository is privé. `danloq` blijft collaborator. Lees: [Setting repository visibility](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility).

### Voeg de ontbrekende tags toe

`phase-2` en `phase-4` bestaan, `phase-1` en `phase-3` niet. Het eindpunt van beide fases staat al in `main`, dus je hoeft niets opnieuw te bouwen:

| Fase | Commit    | Waarom deze                                                                                                                          |
| ---- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | `70467fd` | De laatste commit van `phase-1-fundament`. PR #1 is nooit apart gemerged maar kwam mee met PR #2, dus er is geen eigen merge-commit. |
| 3    | `5937d84` | De merge-commit van PR #3.                                                                                                           |

```bash
git switch main
git pull
git tag phase-1 70467fd
git tag phase-3 5937d84
git push origin phase-1 phase-3
```

- [ ] `git tag` toont `phase-1` t/m `phase-4`.

### Laat je Pull Requests beoordelen

De opdracht zegt: laat de Pull Request beoordelen, verwerk de feedback en merge daarna. Geen van de vier PR's heeft een review. #3 is 36 seconden na het openen gemerged en #4 na ruim een minuut, beide door jezelf.

- [ ] Verwerk stap 2 t/m 6 op een eigen branch, bijvoorbeeld `feedback-fase-1-4`, met een eigen Pull Request. Begin daarna pas aan fase 5.
- [ ] Vraag bij elke PR een review aan en merge pas na goedkeuring.
- [ ] Je PR-beschrijving noemt ook wat nog openstaat. Dat staat nu alleen in #2.

### Commits vanaf nu

- [ ] Commit op het moment dat een stap werkt, niet achteraf in een reeks. Er zijn commits op vijf dagen (16 en 25 oktober, 5, 6 en 12 november), en per dag vallen ze allemaal binnen 36 tot 99 minuten. Op 25 oktober staan acht commits met samen 733 nieuwe regels binnen 36 minuten. Zo laat de historie niet zien hoe je werk gegroeid is. Of heb je heel veel tijd besteed aan het niks doen of te wel wachten op AI, research, vast op een stuk code, dat mag maar als dat de reden is dat je commits zo groot zijn leg dat ook uit in je document.
- [ ] Houd commits klein, ook bij een verbouwing. "Rond fase 3 weekplanning af" raakt 10 bestanden met 778 nieuwe regels. Daarin zit de grootste verandering van het project: de state verhuist naar `useTeamPlanner`.

## Stap 2: los de bugs op

### Bug 1: het rolfilter blijft hangen

(is dat de bug die je gisteren liet zien?)

Zo zie je het:

1. Kies "Planner" in het filter. Je ziet Sara Jansen en Noor Smit.
2. Bewerk beiden en verander hun functie in "Monteur". Verwijderen geeft hetzelfde resultaat.
3. De dropdown toont nu "Alle functies", maar de lijst is leeg: "Geen medewerkers gevonden met deze filters."

Je komt er alleen uit door eerst een andere functie te kiezen. De oorzaak zit in `src/components/EmployeeList.tsx:16-18`. Vergelijk wat er in `selectedRole` staat met de opties die de dropdown nog heeft. Bedenk daarna wat het filter moet doen als de gekozen functie niet meer bestaat.

Lees: [Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure) en [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect).

- [ ] Wat de dropdown toont en wat de lijst filtert is altijd gelijk.
- [ ] `docs/phase-4.md` legt uit welke oplossing je koos en welke je liet vallen.

### Bug 2: een label wijst naar het verkeerde veld

1. Klik op Bewerken bij een taak.
2. Klik in het bewerkformulier op het label "Titel".
3. De cursor springt naar het veld Titel van "Taak toevoegen", bovenaan de pagina.

`src/components/TaskFormFields.tsx:26-32` geeft de velden een vaste `id`. Staan er twee taakformulieren op de pagina, dan bestaat elke `id` twee keer. In `src/components/EmployeeForm.tsx:68` en `:82` is het omgekeerd: die labels horen bij geen enkel veld, dus klikken op "Naam" doet niets.

Lees: [useId](https://react.dev/reference/react/useId).

- [ ] Elk label hoort bij precies één veld, ook met twee formulieren op de pagina.

### Bug 3: een oude foutmelding blijft staan

Ga naar de week van 2 november en probeer Sam de Vries op maandag op "Voorraad controleren" te zetten. Kies daarna een andere dag of een andere medewerker, of ga naar de volgende week: de melding staat er nog, terwijl die niet meer klopt.

Het taakformulier doet hetzelfde. Vul bij "Taak toevoegen" als titel alleen spaties in, vul de rest geldig in en verstuur. Verbeter daarna de titel, zet Duur op 0 en verstuur opnieuw: "Vul een titel in." blijft staan, naast een melding van de browser over de duur.

Dat laatste komt doordat je op twee manieren valideert. `TaskFormFields` en `ScheduleFormFields` gebruiken `required` en `min`, dus de browser houdt het formulier tegen voordat `handleSubmit` draait. Je eigen meldingen voor lege velden verschijnen daardoor nooit, en "Selecteer een medewerker en een taak." (`src/components/ScheduleForm.tsx:30-33`) is onbereikbaar. `EmployeeForm` heeft geen `required` en toont wel je eigen meldingen.

- [ ] Een foutmelding verdwijnt zodra die niet meer van toepassing is. Bepaal zelf wanneer dat is.
- [ ] Alle formulieren valideren op dezelfde manier. Leg in je document uit welke manier je koos.

### Bug 4: de app opent met een lege week

De app opent op de huidige week, maar de voorbeeldplanning in `src/data/mockData.ts` staat vast op de week van 2 november. Sinds 9 november zie je bij het openen dus geen planning meer, terwijl fase 1 om voorbeeldplanning in de weekweergave vraagt.

- [ ] De app opent met voorbeeldplanning in beeld, welke week het ook is.
- [ ] Je hebt bedacht wat dit betekent zodra de planning in fase 5 wordt opgeslagen.

### Bug 5: een nieuwe medewerker neemt de keuze van een verwijderde over

1. Kies Emma Bos in het formulier "Medewerker inplannen".
2. Verwijder Emma Bos. De dropdown toont "Kies een medewerker".
3. Voeg een medewerker "Jan Test" toe. De dropdown toont nu Jan Test, zonder dat je die koos.

Er spelen twee dingen: hoe een nieuwe `id` wordt bepaald (`src/hooks/useTeamPlanner.ts:54-58`) en wat `ScheduleForm` onthoudt nadat de gekozen medewerker verdwenen is. Bij taken werkt het op dezelfde manier.

- [ ] Je kunt uitleggen welke `id` een nieuwe medewerker krijgt nadat de laatste is verwijderd.
- [ ] Een verwijderde keuze komt niet vanzelf terug onder een andere naam.

## Stap 3: regels, state en types

Dit zijn punten waarop expliciet beoordeeld wordt.

- [ ] **De planning staat twee keer in je hook:** in `scheduledTasks` en in `scheduleRef` (`src/hooks/useTeamPlanner.ts:26-29`). Elke functie moet beide bijwerken. De opdracht zegt: niets wordt dubbel opgeslagen. `docs/phase-3.md` noemt de ref niet. Zoek uit wat er misgaat als je de ref weghaalt en waarom medewerkers en taken er geen hebben. Haal de ref daarna weg, of leg in je document uit waarom die moet blijven en welke opties je afwoog. Lees: [Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates) en [Referencing Values with Refs](https://react.dev/learn/referencing-values-with-refs).
- [ ] **De regel "deze taak is vol" staat op twee plekken:** in `isTaskFull` (`src/utils/scheduleRules.ts:31`) en nog een keer uitgeschreven in `src/components/WeekDayColumn.tsx:76-81`. De opdracht wil de planningsregels buiten je componenten.
- [ ] **De regel voor dubbele namen staat twee keer in de hook** (`useTeamPlanner.ts:43-50` en `:87-95`) en niet bij je andere regels.
- [ ] **De `as`-cast in `src/components/ScheduleFormFields.tsx:96` is niet uitgelegd.** De lijst met weekdagen staat bovendien op twee plekken (`ScheduleFormFields.tsx:14` en `WeekView.tsx:15`), los van het type in `src/types.ts:15`. Haal de cast weg of leg hem uit in je document, en zorg voor één bron. Lees: [Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).
- [ ] **Alle props van je formulieren zijn optioneel** (`EmployeeForm.tsx:7-12`, `TaskForm.tsx:7-23`). De compiler keurt een bewerkformulier zonder `onEdit` daardoor goed. Opslaan geeft dan de melding "Deze medewerker bestaat al." Kun je de props zo typeren dat de compiler deze fout vangt? Lees: [Discriminated unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions).
- [ ] **`false` betekent in elk formulier iets anders.** `EmployeeForm` gaat ervan uit dat de naam al bestaat, `TaskForm` dat het maximum te laag is, en `handleAddScheduledTask` geeft de melding zelf terug. Wat toont het formulier als een functie om een tweede reden kan mislukken?
- [ ] **Dezelfde vijf parameters staan drie keer uitgeschreven** (`TaskForm.tsx:15-21`, `TaskList.tsx:10-16`, `useTeamPlanner.ts:141-147`). Je hebt al een type `Task`. Kan dat dit werk doen?
- [ ] **`Button` wordt niet overal gebruikt.** Vier knoppen herhalen de classes met de hand: `ScheduleForm.tsx:73`, `WeekView.tsx:75` en `:83`, en `WeekDayColumn.tsx:116`. Wat mist `Button` waardoor je hem daar niet kon gebruiken?

## Stap 4: maak fase 4 af

- [ ] **Een taak zonder mensen wordt niet gemarkeerd.** Een dag toont alleen taken waar al iemand op staat. Op dinsdag in de week van 2 november zie je daardoor niet dat drie van de vier taken helemaal onbezet zijn, en in een lege week is er niets gemarkeerd. Juist die taken wil een teamleider zien.
- [ ] **Een dag toont een kaart per medewerker, niet per taak.** Zet je twee mensen op "Onderhoud uitvoeren", dan staat de taak er twee keer, beide keren met "2 / 3 medewerkers".
- [ ] **Functie is vrije tekst.** "Monteur" en "monteur" worden twee verschillende filterwaarden. Bedenk hoe je daarmee omgaat.
- [ ] **Zoeken gooit een open bewerkformulier leeg.** Klik op Bewerken bij Sara Jansen, wijzig de naam en typ dan "Lisa" in het zoekveld. Maak het zoekveld weer leeg: het formulier is terug, maar je wijziging is weg. De opdracht zegt: filteren verliest geen data.
- [ ] **Met 0 medewerkers zegt elke dag in het groen "Alle medewerkers zijn ingepland."** (`WeekDayColumn.tsx:44-47`).

## Stap 5: herschrijf je fase-documenten

De opdracht zegt dat de README net zo zwaar telt als de code, en dat eerlijk wint van indrukwekkend. Je vier documenten hebben de juiste opbouw, maar ze beschrijven vooral wat de app doet. Een collega die er niet bij was, leest er niet in hoe het bouwen ging.

- [ ] **Problemen en blokkades.** In geen van de vier documenten staat een probleem. Bij fase 1 staat dat je regelmatig `npm run build` draaide, bij fase 2 en 3 staat wat de app controleert. Schrijf op waar je vastliep, wat je probeerde en wat je niet hebt opgelost. Een aanknopingspunt uit je eigen historie: commit `f6cb8e6` ("Voeg taken bewerken toe") compileert niet en is drie minuten later hersteld. Wat ging daar mis?
- [ ] **Keuzes.** De opdracht vraagt per keuze de opties, wat je koos en waarom. In fase 1 noem je TypeScript en Tailwind, maar die lagen vast. Alleen de keuze voor keuzelijsten in fase 3 noemt een alternatief. Deze keuzes maakte je wel, maar je legt ze nergens uit:
  - `window.confirm` in plaats van een eigen modal
  - bewerken in de lijst zelf in plaats van in een modal
  - een `id` als oplopend getal
  - een dag als tekst (`'Maandag'`) met een losse `weekStart`, in plaats van een datum
  - `scheduleRef` naast `scheduledTasks`
  - `duration` op een taak: wat doet de app ermee?
- [ ] **AI-gebruik.** De opdracht vraagt wat je vroeg en wat je aan het antwoord veranderde. In alle vier de documenten staat ongeveer dezelfde zin: AI als hulpmiddel bij het schrijven, controleren en verbeteren van de code. In fase 3 en 4 staat dat je "de voorgestelde wijzigingen stap voor stap" toepaste. Schrijf per fase op welke vragen je stelde, welke code uit een antwoord kwam en wat je daaraan veranderde of weggooide.
- [ ] **Componentenboom.** Fase 1 is klaar als je README een componentenboom bevat. Je documenten hebben een platte lijst met bestanden. Teken de boom, en zet erbij welke data en functies via props naar beneden gaan.
- [ ] **Het document klopt met de app.** In `docs/phase-4.md` staat dat je getest hebt dat meerdere taken op dezelfde dag als één werkdag tellen, en dat je daarvoor een `Set` gebruikt (`WeekView.tsx:49-53`). Je regel uit fase 3 verbiedt twee taken op één dag. Hoe heb je dit getest, en waartegen beschermt de `Set`?
- [ ] **Wat ik anders zou doen en wat ik geleerd heb.** "Vooraf beter nadenken over de structuur" kan bij elk project staan. Noem het bestand of de beslissing die je bedoelt.

Omdat de code van fase 1 t/m 4 al af is, herschrijf je deze documenten achteraf. Zet dat er gewoon bij.

## Stap 6: ruim restanten op

- [ ] `src/App.css` bevat 184 regels uit het Vite-sjabloon en wordt nog geïmporteerd in `src/App.tsx:1`. Geen enkele selector wordt gebruikt. De opdracht wil alle styling in Tailwind.
- [ ] `src/assets/hero.png`, `react.svg`, `vite.svg` en `public/icons.svg` worden niet gebruikt.
- [ ] `index.html` heeft `lang="en"` en de titel "team-planner", in een Nederlandse app.
- [ ] De toevoegformulieren staan los op de grijze achtergrond, de lijsten in een witte kaart. "Medewerker toevoegen" sluit direct aan op de lijst eronder, "Taak toevoegen" heeft daar wel ruimte.
- [ ] Bijna dezelfde classes voor een invoerveld staan 11 keer in je code, die voor een kaart 4 keer. Is dat een kandidaat voor een eigen component? Bug 2 zit op dezelfde plek.
- [ ] "Maximaal 1 medewerkers" (`TaskList.tsx:72`). In `WeekView` los je "dag" en "dagen" wel op.

Houd je bij de styling aan de timebox van maximaal 1 uur per werkdag.

## Stap 7: fase 5 op branch `phase-5-afronden`

- [ ] Verversen wist nu alles. Bedenk wat je app doet als opgeslagen data ontbreekt of niet klopt, en hoe `scheduledTasks` en `scheduleRef` met dezelfde opgeslagen planning starten.
- [ ] Op 375 px is de takenlijst onleesbaar: de knoppen nemen de ruimte in en de tekstkolom is nog 10 px breed (`TaskList.tsx:57-58` en `:76`). Er is geen horizontaal scrollen, maar de pagina is ruim 6.600 px hoog. Lees: [Responsive design](https://tailwindcss.com/docs/responsive-design).
- [ ] Druk met het toetsenbord op Enter op Bewerken. Het formulier opent, maar de focus is weg en je moet opnieuw vanaf het begin van de pagina tabben. Escape sluit het formulier niet.
- [ ] De opdracht vraagt dat modals sluiten met Escape. Je app heeft geen eigen modals. Bouw er een, of leg in `docs/phase-5.md` uit waarom je dat niet doet.
- [ ] `README.md` linkt al naar `docs/phase-5.md`, dat nog niet bestaat.
- [ ] `docs/final-reflection.md` beantwoordt de drie vragen uit de opdracht.
- [ ] De PR is beoordeeld voordat je merget, en `main` krijgt de tag `phase-5`.

## Bereid je voor op deze vragen

Kun je deze beantwoorden zonder je code te openen?

1. Waarom staat de planning in `scheduledTasks` én in `scheduleRef`, en wat gaat er mis zonder de ref?
2. Wat gebeurt er als ik de prop `onEdit` weghaal bij `EmployeeForm`?
3. Waarom staat `searchName` in `EmployeeList` en niet in `useTeamPlanner`?
4. `handleEditTask` haalt een item eerst uit de planning en roept dan pas `isTaskFull` aan (`useTeamPlanner.ts:150-162`). Waarom?
5. Wat verandert er in `ScheduledTask` en `scheduleRules.ts` als een taak voor een halve dag gepland kan worden?

Je moet elke regel van je code kunnen uitleggen. Lukt dat bij een stuk niet, herschrijf het dan tot het wel lukt. Dat geldt ook voor code waarbij AI geholpen heeft.

## Klaar als

- [ ] De repository is privé en bevat vijf gemergede fase-PR's en vijf tags (`phase-1` t/m `phase-5`). De PR met deze feedback en de PR van fase 5 zijn beoordeeld voordat ze gemerged zijn.
- [ ] `docs/` bevat vijf fase-documenten en `final-reflection.md`.
- [ ] De `README.md` in de root legt alleen uit hoe je de app start en linkt naar de fase-documenten.

## Aanvullingen

Dit is waarschijnlijk wel veel maar als je het stap voor stap doet is het goed te doen. Als je vragen hebt over de feedback of de opdracht kan je die stellen aan mij. Als je vragen hebt over de code kan je die stellen aan AI maar bedoeling van opdracht is dat je zelf nadenkt over waarom bepaalde keuzes maakt en wat er misgaat dus gericht AI vragen en goed documenteren wat je met de antwoorden doet.

AI is geweldig gereedschap maar je gaat geen schroef in een plank draaien met een hamer en dat is precies wat er nu gebeurt.
