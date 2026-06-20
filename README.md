# Bus Seat Booking

Build a React Native App that lets users book seats on a bus.

## 📥 Download APK

[DOWNLOAD APPLICATION APK](https://drive.google.com/file/d/1UQmU6tG3L6k4UObRSDoCA8R4brhbv7GO/view?usp=sharing)

## 🔗 GitHub Repo

## https://github.com/Areandra/BusSeatBooking

## 🎯 Core Features (Required)

- [x] Radio button to choose:
  - **Regular Class** → 20 seats → 10 seats left + 10 seats right (1:1 square seat layout)
  - **Express Class** → 12 seats → 6 seats left + 6 seats right (2:1 rectangle seat layout)
- [x] When a bus type is selected, the correct seat grid layout renders dynamically
- [x] Users can tap seats to select or unselect → selected seats are highlighted visually
- [x] Live total price shown based on selection:
  - Regular at first or last column (near the window) = Rp 150.000 / seat
  - Regular = Rp 100.000 / seat
  - Express at first or last column (near the window) = Rp 200.000 / seat
  - Express = Rp 150.000 / seat
- [x] Maximum selection is 5 seats → user can only book 5 seats at a time
- [x] "Confirm Booking" button → when pressed, selected seats become permanently unavailable (disabled)
- [x] Booked seats are stored locally using AsyncStorage (no backend needed)
- [x] Seat reset rule: seat availability resets automatically ONLY when ALL seats for that bus type are fully booked
  - (Example: all 20 Regular seats booked → reset Regular only. Express is independent.)

## ⭐ Bonus Features (Optional)

- [x] Date picker on the seat selection screen (calendar form sheet)
  - User must select a date before being able to select seats and hit "Confirm"
  - Selected booking date is tied to the order — only seats on that respective date are permanently disabled if already booked
  - Seats only reset when all seats are fully booked on that respective date
- [x] Simple sales history UI (list screen):
  - Which seats were booked
  - The booking date (departure date)
  - Total revenue generated so far
- [x] Date filter on Sales History UI → when selected, only shows history on that respective date

## ✅ Technical Rules

- [x] React Native only
- [x] Utilizes React Native lifecycle (useEffect, useFocusEffect, useCallback)
- [x] No backend required — local data only (AsyncStorage)
- [x] UI is friendly

---

## 💻 Running the Project Locally

```bash
git clone https://github.com/Areandra/BusSeatBooking.git
cd BusSeatBooking
npm install

# iOS
cd ios && pod install && cd ..

# Run
npm run android
npm run ios
```
