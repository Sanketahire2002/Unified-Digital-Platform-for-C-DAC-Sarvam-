package com.cdac.sarvam.dto;

import java.time.LocalDate;

public class AttendanceRequestDTO {

    private Long PRN;
    private LocalDate date;
    private boolean status;
	public Long getPRN() {
		return PRN;
	}
	public void setPRN(Long pRN) {
		PRN = pRN;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}

    
}
