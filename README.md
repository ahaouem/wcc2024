# Technischools Winter Camp

Projekt skierowany do młodych talentów programistycznych, mający na celu uświadomienie, jak porywające i dostępne może być kreowanie własnych rozwiązań przy wykorzystaniu interfejsów programowania aplikacji (API) oraz sztucznej inteligencji (AI). Prezentacja projektu miała miejsce podczas [półkolonii w Technischools](https://technischools.com/winter-codecamp-2024), gdzie zainspirowaliśmy młodych adeptów technologii do eksplorowania fascynującego świata programowania.

## Struktura Projektu

- `app/layout.tsx`: Jest to komponent układu, który otacza główny komponent strony.
  - `app/page.tsx`: Komponent Home reprezentujący główną stronę aplikacji, z której użytkownicy mogą korzystać. Obejmuje:
    - `app/form.tsx`: Jest to główny komponent aplikacji. Zawiera formularz, w którym użytkownicy mogą wprowadzać swoje zapytania. Formularz obsługuje przesyłanie tych zapytań do API OpenAI i wyświetlanie odpowiedzi.

## Instalacja

1. Sklonuj repozytorium `git clone https://github.com/ahaouem/techni-winter-camp.git`.
2. Wykonaj komende `git checkout completed`.
3. Zainstaluj zależności za pomocą `bun install`.
4. Skopiuj plik `.env.example` do nowego pliku o nazwie `.env` i wprowadź swój klucz API OpenAI.
5. Uruchom aplikację za pomocą `bun dev`.

## Polecane darmowe API

- [Api do przewalutowywania stanowi użyteczne narzędzie, które umożliwia dynamiczną konwersję kursów wymiany walut. ](https://rapidapi.com/warting/api/currency-converter/)
- [Śmieszne API służące do losowania randomowych znanych cytatów](https://rapidapi.com/andruxnet/api/random-famous-quotes)
- [Kolejne śmieszne API służące do odsłynia różnych ciekawych faktów o Chuck'u Norrisie](https://rapidapi.com/matchilling/api/chuck-norris/)
- [Freemium API służące do wyciągania danych różnych danych powiązanych z NBA](https://rapidapi.com/api-sports/api/api-nba)

## Licencja

Ten projekt jest licencjonowany na podstawie licencji MIT.
