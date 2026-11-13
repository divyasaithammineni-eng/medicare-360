# MediCare 360 — Smart Hospital Management System

A complete browser-based hospital management demo built with HTML, CSS and JavaScript.

## Run the project
1. Extract `MediCare360.zip`.
2. Open the extracted `MediCare360` folder.
3. Double-click `index.html`.
4. The application opens in your default browser.

No Node.js, Java, Maven, server, or internet connection is required.

## Features
- Dashboard with live counts and appointment activity
- Patient registration, profiles, search, edit and delete
- Doctor directory, specializations, profiles, edit and delete
- Appointment booking, rescheduling, cancellation and completion status
- Prevents duplicate doctor/date/time bookings
- Prevents past appointments and inactive-doctor bookings
- Daily doctor-wise schedule
- Browser localStorage persistence

## Demo data
The first launch loads sample patients, doctors and appointments. Changes are saved in your browser's localStorage.

To reset to the original sample data, open browser Developer Tools > Application/Storage > Local Storage, delete the `medicare360` key, and refresh.

## Important academic note
This is a web implementation, not a JavaFX desktop application. It demonstrates the requested workflows, but it does not implement Java inheritance, Java Collections, Java exception classes, or Java file handling. Data is stored in browser localStorage. For a strict Java/JavaFX submission, a Java backend/desktop implementation is required.

## Security note
This is a demonstration project. Do not enter real patient medical or personal information. It has no production authentication, encryption, server-side database, or compliance controls.
