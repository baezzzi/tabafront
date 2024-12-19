package com.myapp

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch


class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.splashscreen)  // 스플래시 화면의 레이아웃

        // Coroutine을 사용하여 2초 후 MainActivity로 이동
        lifecycleScope.launch(Dispatchers.Main) {
            delay(1000)  // 2초 동안 대기
            val intent = Intent(this@SplashActivity, MainActivity::class.java)
            startActivity(intent)
            finish()  // SplashActivity 종료
        }

    }
}