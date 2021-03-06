class ArticlesController < ApplicationController

  before_filter :authenticate_user!

  # GET /articles
  # GET /articles.json
  # def index
  #   @articles = Article.all

  #   respond_to do |format|
  #     format.html # index.html.erb
  #     format.json { render :json => @articles }
  #   end
  # end

  # GET /articles/1
  # GET /articles/1.json
  # def show
  #   @article = Article.find(params[:id])

  #   respond_to do |format|
  #     format.html # show.html.erb
  #     format.json { render :json => @article }
  #   end
  # end

  # GET /articles/new
  # GET /articles/new.json
  # def new
  #   @article = Article.new

  #   respond_to do |format|
  #     format.html # new.html.erb
  #     format.json { render :json => @article }
  #   end
  # end

  # GET /articles/1/edit
  # def edit
  #   @article = Article.find(params[:id])
  # end

  # POST /articles
  # POST /articles.json
  def create
    @user = User.find(params[:user_id])
    @article = @user.articles.new(article_params)
  
    diffbot = Biffbot::Base.new("c71959b7b4f679b683a289a4d7dfa0bd")

    options = Hash.new
    options[:summary] = true

    diffbot_article = diffbot.parse(@article.url, options)

    @article.title = diffbot_article[:title]
    @article.summary = diffbot_article[:summary]

    if @article.save
      render :json=> {:article => @article, :status => :created, :location => @article }
    else
      render :json=> {:article => @article.errors, :status => :unprocessable_entity}
      
    end
  end

  # PUT /articles/1
  # PUT /articles/1.json
  # def update
  #   @article = Article.find(params[:id])

  #   respond_to do |format|
  #     if @article.update_attributes(params[:article])
  #       format.html { redirect_to @article, :notice => 'Article was successfully updated.' }
  #       format.json { head :no_content }
  #     else
  #       format.html { render :action => "edit" }
  #       format.json { render :json => @article.errors, :status => :unprocessable_entity }
  #     end
  #   end
  # end

  # DELETE /articles/1
  # DELETE /articles/1.json
  def destroy
    @article = Article.find(params[:id])
    @article.destroy

    respond_to do |format|
      format.html { redirect_to articles_url }
      format.json { head :no_content }
    end
  end

   def article_params
    params.require(:article).permit(:send_at, :url, :summary, :title, :user_id)
  end
end
