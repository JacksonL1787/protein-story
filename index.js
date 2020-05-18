let dnaCode = "ATGGCCGCCTACAAACTGGTGCTGATCCGG".trim().toUpperCase().split("")
let complementaryDnaCode = ""
let complementaryRules = {
  A: "T",
  T: "A",
  G: "C",
  C: "G"
}
let transcriptionRules = {
  T: "U"
}
let tRnaRules = {
  A: "U",
  U: "A",
  G: "C",
  C: "G"
}
let mRNA = ""
let tRNA = ""

let aminoAcids = [
  "Met",
  "Ala",
  "Ala",
  "Tyr",
  "Lys",
  "Leu",
  "Val",
  "Leu",
  "Ile",
  "Arg"
]

dnaCode.forEach((l) => {
  complementaryDnaCode += complementaryRules[l]
  mRNA += transcriptionRules[l] ? transcriptionRules[l] : l
})

mRNA.split("").forEach((l) => {
  tRNA += tRnaRules[l] ? tRnaRules[l] : l
})

const addDnaStrand = () => {
  dnaCode.forEach((l) => {
    console.log(l)
    $(".demo-container .dna-strand").append(`

      <div class="letter letter-${l.toLowerCase()}">
        <div class="bar"></div>
        <div class="text-bg">
          <p>${l}</p>
        </div>
      </div>

      `)
  })
}

const addCompDnaStrand = () => {
  complementaryDnaCode.split("").forEach((l, i) => {
    setTimeout(() => {
      $(".demo-container .complementary-dna-strand").append(`
        <div class="letter letter-${l.toLowerCase()}">
          <div class="bar"></div>
          <div class="text-bg">
            <p>${l}</p>
          </div>
        </div>
        `)
    }, i * 200)
  })
  setTimeout(() => {
    $(".demo-container .next-btn").removeClass("inactive")
  }, complementaryDnaCode.length * 200)
}

const transcription = () => {
  $(".demo-container .complementary-dna-strand .letter").addClass("hidden")
  setTimeout(() => {
    $(".demo-container .complementary-dna-strand").remove()
  }, 500)

  $('.demo-container .dna-strand .letter.letter-t').each(function(i) {
    let elem = $(this)
    setTimeout(() => {
      elem.css("opacity", '0').css("transform", "translateY(-20px)")
      setTimeout(() => {
        elem.find("p").text("U")
        elem.removeClass("letter-t").addClass("letter-u").css("opacity", '1').css("transform", "translateY(0)")
      }, 600)
    }, i * 500)
  })
  setTimeout(() => {
    $(".demo-container .next-btn").removeClass("inactive")
  }, (($('.demo-container .dna-strand .letter.letter-t').length - 1) * 500) + 100)

}

$(".begin-story-container .begin-btn").click(() => {
  $(".begin-story-container").removeClass("active")
  $(".demo-container").addClass('active')
  setTimeout(() => {
    addCompDnaStrand()
  }, 500)
})

const mrnaLeaveNucleus = () => {
  $(".demo-container .content").css("overflow-x", "hidden")
  $(".demo-container .content .dna-strand").addClass('in-ribosome')
  setTimeout(() => {
    $(".demo-container .content").append(`<div class="ribosome"><p>Ribosome</p></div>`)
    setTimeout(() => {
      $(".demo-container .next-btn").removeClass("inactive")
    }, 300)
  }, 500)

}

const runTranslation = (count) => {
  $(".demo-container .content .dna-strand .letter:lt(3)").css("opacity", "0")
  $(".demo-container .content .trna").css('opacity', '0')
  setTimeout(() => {
    $(".demo-container .content .trna .letter-1").removeClass("letter-a").removeClass("letter-u").removeClass("letter-c").removeClass("letter-g").addClass(`letter-${tRNA[count].toLowerCase()}`)
    $(".demo-container .content .trna .letter-1 p").text(tRNA[count])
    $(".demo-container .content .trna .letter-2").removeClass("letter-a").removeClass("letter-u").removeClass("letter-c").removeClass("letter-g").addClass(`letter-${tRNA[count+1].toLowerCase()}`)
    $(".demo-container .content .trna .letter-2 p").text(tRNA[count+1])
    $(".demo-container .content .trna .letter-3").removeClass("letter-a").removeClass("letter-u").removeClass("letter-c").removeClass("letter-g").addClass(`letter-${tRNA[count+2].toLowerCase()}`)
    $(".demo-container .content .trna .letter-3 p").text(tRNA[count+2])
    $(".demo-container .content .dna-strand").animate({
      marginLeft: '-=180px'
    }, 300)
  }, 300)
  setTimeout(() => {
    $(".demo-container .content .trna").css('opacity', '1')
    if(aminoAcids[count/3]) {
      $(".amino-acids-container").prepend(`
        <div class="amino-acid">
          <p>${aminoAcids[count/3]}</p>
        </div>
        <div class="connector"></div>
      `)
    }

    $(".demo-container .content .dna-strand .letter:lt(3)").remove()
    $(".demo-container .content .dna-strand").css("margin-left", "20px")
  }, 1000)
}

const translation = () => {
  let count = 3
  $(".demo-container .content").append(`
    <div class="trna" css="opacity: 0;">
      <div class="letters">
        <div class="letter-1 text-bg letter-${tRNA[0].toLowerCase()}">
          <p>${tRNA[0]}</p>
        </div>
        <div class="letter-2 text-bg letter-${tRNA[1].toLowerCase()}">
          <p>${tRNA[1]}</p>
        </div>
        <div class="letter-3 text-bg letter-${tRNA[2].toLowerCase()}">
          <p>${tRNA[2]}</p>
        </div>
      </div>
      <div class="body">
        <p>tRNA</p>
      </div>
      <div class="connector"></div>
    </div>
    `)
  $(".demo-container .content").append("<div class='amino-acids-container'></div>")
  $(".amino-acids-container").prepend(`
    <div class="amino-acid">
      <p>${aminoAcids[0]}</p>
    </div>
  `)
  let translationAnim = setInterval(() => {
    if(count >= tRNA.length) {
      clearInterval(translationAnim)
      $(".demo-container .content .dna-strand .letter:lt(3)").css("opacity", "0")
      $(".demo-container .content .trna").css('opacity', '0')
      setTimeout(() => {
        $(".trna").remove()
        $(".ribosome").remove()
        $('.dna-strand').remove()
        $('.amino-acids-container').css("margin", "30px auto").css("width", "fit-content")
        $(".demo-container .next-btn").removeClass("inactive")
      }, 300)

    }
    runTranslation(count)
    count+=3
  }, 3000)
}

$(".demo-container .next-btn").click(function() {
  if($(this).hasClass('inactive')) return;

  const phase = $('.demo-container').attr("data-phase");
  $(this).addClass('inactive')
  if(phase === "dna-replication") {
    $('.demo-container').attr("data-phase", "transcription")
    $(".demo-container .title-container .title").text("Transcription")
    transcription()
  } else if (phase === "transcription") {
    $('.demo-container').attr("data-phase", "mrna-leave-nucleus")
    $(".demo-container .title-container .title").text("mRNA to Ribosome")
    mrnaLeaveNucleus()
  } else if (phase === "mrna-leave-nucleus") {
    $('.demo-container').attr("data-phase", "translation")
    $(".demo-container .title-container .title").text("Translation")
    translation()
  } else if (phase === "translation") {
    $('.demo-container').attr("data-phase", "protein")
    $(".demo-container .title-container .title").text("Protein")
    $('.demo-container .next-btn').remove()
  }

})


$(document).ready(() => {
  addDnaStrand()
})
